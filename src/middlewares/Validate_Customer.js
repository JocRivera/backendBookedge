// Funciones que se ejecutan antes de los controllers
// Realizan validaciones de datos
// Verifican autenticación/autorización 

// El método next() de JavaScript devuelve un objeto con las propiedades done y value

export const validateCustomer = (req, res, next) => {
    const { name, eps, identificationType, identification, email, cellphone, address, password, status } = req.body;
    if(!name){
        return res.status(400).json({ error: "El nombre es requerido" });
    }

    if(/^\d+$/.test(name)){
        return res.status(400).json({ error: "El nombre no puede contener números" });
    }

    if(!eps){
        return res.status(400).json({ error: "La EPS es requerida" });
    }

    if(/^\d+$/.test(eps)){
        return res.status(400).json({ error: "La EPS no puede contener números" });
    }

    if(!identificationType){
        return res.status(400).json({ error: "El tipo de identificación es requerido."});
    }

    if(identificationType !== 'CC' && identificationType !== 'CE'){
        return res.status(400).json({ error: "El tipo de identificación debe ser 'CC' o 'CE'" });
    }

    if(isNaN(identification)){
        return res.status(400).json({ error: "La identificación debe estar compuesta únicamente de números" });
    }

    if(!identification){
        return res.status(400).json({ error: "La identificación es requerida" });
    }

    if(!email){
        return res.status(400).json({ error: "El correo electrónica es requerido" });
    }

    if(!cellphone){
        return res.status(400).json({ error: "El celular es requerido" });
    }

    //No puede contener letras
    if(isNaN(cellphone)){
        return res.status(400).json({ error: "El celular debe estar compuesto únicamente de números" });
    }

    if(!address){
        return res.status(400).json({ error: "La dirección es requerida" });
    }

    if(!password){
        return res.status(400).json({ error: "La contraseña es requerida" });
    }

    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,15}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "La contraseña debe tener entre 8 y 15 caracteres y contener al menos un número y una letra" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "El correo electrónico tiene un formato incorrecto." });
    }

    if(status !== true && status !== false && status) {
        return res.status(400).json({ error: "El estado debe ser verdadero o falso (true) o (false)" });
    }

    if(email.length > 100) {
        return res.status(400).json({ error: "El correo electrónico debe tener menos de 100 caracteres" });
    }

    if(cellphone.length > 10) {
        return res.status(400).json({ error: "El celular debe tener menos de 10 caracteres" });
    }

    next();
}