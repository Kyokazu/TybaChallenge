export class user {
  constructor({ email, name, password }) {
    //Requerir si o si que los usuarios llenen todos los campos.

    if (!email || !name || !password) {
      throw new Error(
        "Todos los datos son obligatorios para registrar el usuario"
      );
    }
    this.email = email;
    this.name = name;
    this.password = password;
  }
}
