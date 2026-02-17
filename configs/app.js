'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';

// Routers
import usuariosRoutes from '../src/usuarios/usuarios.routes.js';
import opinionRoutes from '../src/opiniones/opinion.routes.js';
import comentarioRoutes from '../src/comentarios/comentario.routes.js';
import loginRoutes from '../src/login/login.routes.js';

const BASE_URL = '/Opiniones/v1';

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        // Conectar a base de datos
        await dbConnection();

        // ========================
        // MIDDLEWARES
        // ========================
        app.use(express.urlencoded({ extended: false, limit: '10mb' }));
        app.use(express.json({ limit: '10mb' }));
        app.use(cors(corsOptions));
        app.use(morgan('dev'));

        // ========================
        // RUTAS
        // ========================
        app.use(`${BASE_URL}/usuarios`, usuariosRoutes);
        app.use(`${BASE_URL}/opiniones`, opinionRoutes);
        app.use(`${BASE_URL}/comentarios`, comentarioRoutes);
        app.use(`${BASE_URL}/login`, loginRoutes);

        // ========================
        // HEALTH CHECK
        // ========================
        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'Opiniones System',
                version: '1.0.0'
            });
        });

        // ========================
        // LEVANTAR SERVIDOR
        // ========================
        app.listen(PORT, () => {
            console.log(`Servidor Opiniones | puerto ${PORT}`);
            console.log(`Base URL : http://localhost:${PORT}${BASE_URL}`);
        });

    } catch (error) {
        console.log('Error al iniciar servidor:', error);
    }
};
