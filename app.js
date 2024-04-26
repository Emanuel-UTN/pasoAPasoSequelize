const sequelize = require("./db");
const Usuario = require("./usuario")

Usuario.hasMany(Tarea);
Tarea.belongsTo(Usuario);

async function main(){
    try{
        // Sincronizar la base de datos con el modelo
        await sequelize.sync();

        // Probar la conexión
        // await sequelize.authenticate();

        console.log("Base de Datos: Lista")

    }catch(error){
        console.error("Ha ocurrido un error", error)
    }   
}

async function crearUsuarios(){
    const juanPerez = crearUsuario("Juan", "Perez", "jperez", "MiPwd%%$$W", "jperez@gmail.com");
    console.log("Usuario Creado ID:", juanPerez.id);

    const mariaGarcia = crearUsuario("Maria", "Garcia", "mgarcia", "Pwd%%$$Wss", "mgarcia@gmail.com");
    console.log("Usuario Creado ID:", mariaGarcia.id);
}

async function crearUsuario(name, surname, user, password, email){
    let datosUsuario = {
        nombre: name,
        apellido: surname,
        usuario: user,
        password: password,
        email: email
    };
    let usuario = await Usuario.create(datosUsuario);
    console.log("\n------------------------\n")
    return usuario
}

async function recuperarUsuarios(){
    const usuarios = await Usuario.findAll();
    console.log("\n------------------------\n")
    usuarios.forEach((u) => {
        console.log(`|${u.nombre}|${u.apellido}|${u.usuario}|${u.email}|`)
    });
}

async function recuperarUsuario(id){
    const u = await Usuario.findOne({ where: { id: id}});
    console.log("\n------------------------\n")
    console.log(`|${u.nombre}|${u.apellido}|${u.usuario}|${u.email}|`)
}

async function actualizarUsuario(id, nombre){
    const u = Usuario.findOne({ where: {id: id}});
    if(u){
        u.nombre = nombre;
        await u.save();
    }
}

async function eliminarUsuario(id){
    const u = Usuario.findOne({ where: {id: id}});
    if(u){
        await u.destroy();
    }
}

async function agregarTareaAUsuario(userId, descripcionTarea){
    const u = await Usuario.findOne({ where: {id: userId}});
    if(u){
        await u.createTarea({
            descripcion: descripcionTarea
        });
    }
}

async function listarTareasUsuario(userId){
    const u = Usuario.findOne({ where: {id: userId}});
    if(u){
        const tareas = await u.getTareas();
        console.log("\n------------------------\n")
        tareas.forEach((t) => {
            console.log(`|${t.descripcion}|`)
        })
    }
}

async function eliminarTareaUsuario(userId, descripcionTarea){
    const u = Usuario.findOne({ where: {id: userId}});
    if(u){
        const t = await u.getTareas({ where: {descripcion: descripcionTarea}});

        if(t){
            await u.remove(t);
        }
    }
}

main();