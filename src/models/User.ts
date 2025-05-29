export class User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;

  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

// const user = new User(1, "Vanda", "vanda@example.com", "123456");
// console.log(user.name); // Vanda
