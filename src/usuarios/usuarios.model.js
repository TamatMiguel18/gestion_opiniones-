import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true
        },
        apellido: {
            type: String,
            required: [true, 'El apellido es obligatorio'],
            trim: true
        },
        username: {
            type: String,
            required: [true, 'El username es obligatorio'],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
        },
        role: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER'
        },
        estado: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);


// ===============================
// 🔐 ENCRIPTAR PASSWORD
// ===============================
usuarioSchema.pre('save', async function () {

    // Solo si la contraseña fue modificada
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// ===============================
// 🔎 MÉTODO PARA COMPARAR PASSWORD
// ===============================
usuarioSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


export default model('Usuario', usuarioSchema);
