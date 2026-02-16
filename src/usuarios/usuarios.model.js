'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Encriptar password antes de guardar
UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Comparar password
UsuarioSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

UsuarioSchema.index({ isActive: 1 });
export default mongoose.model('Usuario', UsuarioSchema);
