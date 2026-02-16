'use strict';

import mongoose from 'mongoose';

const OpinionSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    categoria: { type: String, required: true },
    contenido: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

OpinionSchema.index({ usuario: 1, createdAt: -1 });
export default mongoose.model('Opinion', OpinionSchema);
