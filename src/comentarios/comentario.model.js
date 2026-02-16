'use strict';

import mongoose from 'mongoose';

const ComentarioSchema = new mongoose.Schema({
    opinion: { type: mongoose.Schema.Types.ObjectId, ref: 'Opinion', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    contenido: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

ComentarioSchema.index({ opinion: 1, usuario: 1 });
export default mongoose.model('Comentario', ComentarioSchema);
