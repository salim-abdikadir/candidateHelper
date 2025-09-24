# **Campaign Management App – Full System Design Document (Updated)**

## **1. Overview**

The Campaign Management App manages:

* **Supporters** – track personal info, location, polling stations, and engagement status.
* **Operators** – field staff managing supporters, tasks, events, and funds.
* **Administrators** – top-level users managing the campaign, tasks, permissions, logistics, and reports.

**Key Features:**

1. Supporter registration & tracking with geolocation.
2. Operator assignment, approval workflow, and activity tracking.
3. Action-based permissions for operators and admins.
4. Event management (where, who, why, feedback, expenses).
5. Fund management & expense tracking.
6. Transport & logistics planning with geospatial optimization.
7. Secure authentication & authorization for all users.
8. AI-assisted analytics and predictive insights.

---

## **2. Authentication & Access Control**

### **2.1 Login Mechanism**

* All users (Supporters, Operators, Admins) use **email/phone + password** login.
* **Passwords are hashed** using bcrypt.
* **Token-based authentication** (Laravel Sanctum or Passport).
* Tokens stored in **HTTP-only cookies** for frontend security.

### **2.2 Action-Based Permissions**

* **Operators/Admins** have **actions assigned individually** or via **action groups**.
* Middleware verifies **token + allowed actions** for each API endpoint.

**Example Actions:**
`create_supporter`, `update_supporter`, `approve_supporter`, `assign_task`, `create_event`, `log_fund`, `view_map`, `generate_report`

---

## **3. Modules & Database Design**

### **3.1 Supporter Module**

Manages supporters' personal info, geolocation, polling stations, and emergency contacts.

#### Tables

**`regions`**

| Field      | Type          | Notes                    |
| ---------- | ------------- | ------------------------ |
| id         | PK            | Auto-increment           |
| name       | string        | Unique                   |
| latitude   | decimal(10,7) | Optional                 |
| longitude  | decimal(10,7) | Optional                 |
| boundary   | json          | Optional GeoJSON polygon |
| timestamps |               | created_at, updated_at   |

**`districts`**

| Field      | Type          | Notes                    |
| ---------- | ------------- | ------------------------ |
| id         | PK            | Auto-increment           |
| name       | string        |                          |
| region_id  | FK → regions  | Cascade on delete        |
| latitude   | decimal(10,7) | Optional                 |
| longitude  | decimal(10,7) | Optional                 |
| boundary   | json          | Optional GeoJSON polygon |
| timestamps |               |                          |

**`polling_stations`**

| Field        | Type           | Notes             |
| ------------ | -------------- | ----------------- |
| id           | PK             | Auto-increment    |
| name         | string         |                   |
| district_id  | FK → districts | Cascade on delete |
| latitude     | decimal(10,7)  | Required          |
| longitude    | decimal(10,7)  | Required          |
| timestamps   |                |                   |

**`supporters`**

| Field               | Type                            | Notes                    |
| ------------------- | ------------------------------- | ------------------------ |
| id                  | PK                              | Auto-increment           |
| firstname           | string                          |                          |
| middlename          | string, nullable                |                          |
| lastname            | string                          |                          |
| fourthname          | string, nullable                |                          |
| birthdate           | date, nullable                  |                          |
| gender              | enum(m/f/other)                 |                          |
| language            | string, nullable                |                          |
| special_needs       | text, nullable                  |                          |
| email               | string, nullable                |                          |
| address             | text, nullable                  |                          |
| latitude            | decimal(10,7)                   | Geolocation              |
| longitude           | decimal(10,7)                   | Geolocation              |
| voter_id            | string, nullable                |                          |
| photo_verification  | string, nullable                |                          |
| fav_party           | string, nullable                |                          |
| status              | enum(pending/approved/rejected) | Default: pending         |
| pollingstation_id   | FK → polling_stations           |                          |
| district_id         | FK → districts                  |                          |
| region_id           | FK → regions                    |                          |
| created_by          | FK → users                      |                          |
| updated_by          | FK → users                      |                          |
| timestamps          |                                 | created_at, updated_at   |
| deleted_at          | soft delete                     |                          |

**`supporter_phones`** – multiple phones
**`supporter_emergency_contacts`** – multiple contacts

---

### **3.2 Operator Module**

Manages operators, tasks, supporters, events, funds, and activity logs.

#### Tables

**`operators`**

| Field          | Type                              | Notes                     |
| -------------- | --------------------------------- | ------------------------- |
| id             | PK                                | Auto-increment            |
| firstname      | string                            |                           |
| middlename     | string, nullable                  |                           |
| lastname       | string                            |                           |
| fourthname     | string, nullable                  |                           |
| birthdate      | date, nullable                    |                           |
| gender         | enum(m/f/other)                   |                           |
| language       | string, nullable                  |                           |
| special_needs  | text, nullable                    |                           |
| email          | string, nullable                  | Unique if available       |
| address        | text, nullable                    |                           |
| latitude       | decimal(10,7), nullable           | Geolocation               |
| longitude      | decimal(10,7), nullable           | Geolocation               |
| role           | enum(operator, supervisor, admin) | Optional grouping         |
| status         | enum(pending, approved, rejected) | New: track workflow/fired |
| created_by     | FK → users.id                     |                           |
| updated_by     | FK → users.id                     |                           |
| timestamps     |                                   | created_at, updated_at    |
| deleted_at     | soft delete                       |                           |

**Other Operator Tables:**

* `operator_phones` / `operator_emergency_contacts`
* `operator_tasks` – many-to-many assignment with status
* `operator_supporters` – many-to-many
* `operator_events` – many-to-many with roles (organizer, coordinator, attendee)
* `operator_activity_logs` – tracks actions with entity_type & entity_id
* `operator_funds` – tracks amounts, category, source, description

**Action-Based Permissions**

* `actions` table stores all possible actions
* `operator_actions` links operators to allowed actions
* Optional: action groups for bulk assignment

---

### **3.3 Administrator Module**

Admins manage operators, supporters, tasks, events, funds, and reports.

**`admins`**

| Field       | Type             | Notes                    |
| ----------- | ---------------- | ------------------------ |
| id          | PK               | Auto-increment           |
| firstname   | string           |                          |
| middlename  | string, nullable |                          |
| lastname    | string           |                          |
| email       | string           | Unique                   |
| password    | string           | Hashed                   |
| role        | enum(admin)      | Optional super-admin     |
| timestamps  |                  | created_at, updated_at   |
| deleted_at  | soft delete      |                          |

**`admin_activity_logs`** – tracks all admin actions
Optional action-based permissions can be reused for admins.

---

### **3.4 Relationships Summary (ERD)**

```
Regions ──< Districts ──< PollingStations ──< Supporters
Supporters ──< SupporterPhones
Supporters ──< SupporterEmergencyContacts
Operators ──< OperatorPhones
Operators ──< OperatorEmergencyContacts
Operators ──< OperatorTasks >── Tasks
Operators ──< OperatorSupporters >── Supporters
Operators ──< OperatorEvents >── Events
Operators ──< OperatorActivityLogs
Operators ──< OperatorFunds
Operators ──< OperatorActions >── Actions
Admins ──< AdminActivityLogs
Admins ──< OperatorAssignments, SupporterAssignments, FundManagement, EventManagement
```

---

### **3.5 Geospatial Support**

* Latitude/Longitude stored for supporters, operators, polling stations, events, districts, and regions
* Optional GeoJSON boundaries for districts/regions
* Proximity queries for routing optimization
* Frontend mapping via Leaflet, Mapbox, or Google Maps

---

## **4. Frontend Data Models (TypeScript)**

**Supporter**

```ts
interface Supporter {
  id:number; firstname:string; lastname:string; middlename?:string; fourthname?:string;
  birthdate?:string; gender?: "male"|"female"|"other";
  language?:string; special_needs?:string;
  phones:string[]; email?:string; address?:string;
  latitude?:number; longitude?:number;
  voter_id?:string; photo_verification?:string; fav_party?:string;
  status:"pending"|"approved"|"rejected";
  pollingstation?:{id:number; name:string; location?:{lat:number; long:number}};
  district?:{id:number; name:string}; region?:{id:number; name};
  created_by?:number; updated_by?:number; created_at:string; updated_at:string;
}
```

**Operator**

```ts
interface Operator {
  id:number; firstname:string; lastname:string; middlename?:string; fourthname?:string;
  birthdate?:string; gender?: "male"|"female"|"other"; language?:string;
  special_needs?:string; email?:string; address?:string; phones:string[];
  latitude?:number; longitude?:number;
  status:"pending"|"approved"|"rejected"; // Updated
  assignedTasks?:Task[]; assignedSupporters?:Supporter[]; assignedEvents?:Event[];
  activityLogs?:ActivityLog[]; funds?:Fund[];
  allowedActions:string[];
  created_by?:number; updated_by?:number; created_at:string; updated_at:string;
}
```

**Admin**

```ts
interface Admin {
  id:number; firstname:string; lastname:string; middlename?:string;
  email:string; allowedActions?:string[]; created_at:string; updated_at:string;
}
```

---

## **5. AI Integration Optimizations**

* Standardize table and field naming for AI prompts
* Include `entity_type`, `action_name`, `status`, `latitude`, `longitude`
* Include timestamps for predictive analytics and reporting
* Support routing optimization, event efficiency, and fund analysis

---

✅ **This document now covers:**

* Supporters, Operators, and Admins
* Action-based permissions & workflow statuses
* Geospatial mapping & routing
* Tasks, events, and fund management
* Authentication & login mechanism
* Frontend data structures compatible with Next.js
* Optimized for AI prompts and predictive analytics
