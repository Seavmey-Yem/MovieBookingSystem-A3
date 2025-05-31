import { UserService } from './methods/UserService';
import { StaffService } from './methods/StaffService';
import { AdminService } from './methods/AdminService';
import { User } from './models/User';
import { Staff } from './models/Staff';
import { Admin } from './models/Admin';

// Instantiate services
const userService = new UserService();
const staffService = new StaffService();
const adminService = new AdminService();

console.log('--- Step 1: Registering initial users ---');
const user1 = userService.register("Vanda", "vanda@example.com", "password123");
console.log('User 1 registered: Vanda');
const user2 = userService.register("Sokha", "sokha@example.com", "pass456");
console.log('User 2 registered: Sokha');
const user3 = userService.register("Chandy", "chandy@example.com", "pass789");
console.log('User 3 registered: Chandy');
const user4 = userService.register("Rithy", "rithy@example.com", "pass101");
console.log('User 4 registered: Rithy');
const user5 = userService.register("Poleak", "poleak@example.com", "pass112");
console.log('User 5 registered: Poleak');

const user6 = userService.register("Extra", "extra@example.com", "pass");
if (!user6) {
  console.log('User 6 registration failed: limit reached');
}

console.log('\n--- Step 2: Registering initial staff ---');
const staff1 = staffService.registerStaff("Seavmey", "seavmey@example.com", "Concession");
console.log('Staff 1 registered: Seavmey');
const staff2 = staffService.registerStaff("Pisey", "pisey@example.com", "Ticket");
console.log('Staff 2 registered: Pisey');
const staff3 = staffService.registerStaff("Sopheak", "sopheak@example.com", "Cleaning");
console.log('Staff 3 registered: Sopheak');

const staff4 = staffService.registerStaff("Extra", "extra2@example.com", "");
if (!staff4) {
  console.log('Staff 4 registration failed: limit reached');
}

console.log('\n--- Step 3: Registering initial admins ---');
const admin1 = adminService.registerAdmin("Horth", "horth@example.com", 5);
console.log('Admin 1 registered: Horth');

const admin2 = adminService.registerAdmin("Extra", "extra3@example.com", 3);
if (!admin2) {
  console.log('Admin 2 registration failed: limit reached');
}

console.log('\n--- Step 4: Registering new admins only ---');
const newAdmin1 = adminService.registerNewPerson("Yon", "yon@example.com", 4);
if (!newAdmin1) {
  console.log('New admin registration failed: limit reached');
}

console.log('\n--- Step 5: Testing login ---');
const loginSuccess = userService.login("vanda@example.com", "password123");
console.log(loginSuccess ? 'User login succeeded: vanda@example.com' : 'User login failed: vanda@example.com');

const loginFail = userService.login("vanda@example.com", "wrongpass");
console.log(loginFail ? 'User login succeeded (unexpected): vanda@example.com' : 'User login failed as expected: vanda@example.com');

const adminLoginFail = userService.login("horth@example.com", "");
console.log(adminLoginFail ? 'Admin login succeeded (unexpected): horth@example.com' : 'Admin login failed as expected: horth@example.com');

console.log('\n--- Step 6: Viewing users ---');
for (let id = 1; id <= 6; id++) {
  const user = userService.getPersonById(id);
  if (user) {
    console.log('User found: ' + user.name + ' (ID: ' + id + ')');
  } else {
    console.log('User not found for ID: ' + id);
  }
}

console.log('\n--- Step 7: Attempting to view staff (restricted) ---');
for (let id = 1; id <= 4; id++) {
  const staff = staffService.getPersonById(id);
  if (staff) {
    console.log('Staff found: ' + staff.name + ' (ID: ' + id + ')');
  } else {
    console.log('Staff not found for ID: ' + id);
  }
}

console.log('\n--- Step 8: Attempting to view admins (restricted) ---');
for (let id = 1; id <= 2; id++) {
  const admin = adminService.getPersonById(id);
  if (admin) {
    console.log('Admin found: ' + admin.name + ' (ID: ' + id + ')');
  } else {
    console.log('Admin not found for ID: ' + id);
  }
}

console.log('\n--- Step 9: Final system counts ---');
userService.displayCounts();
staffService.displayCounts();
adminService.displayCounts();
