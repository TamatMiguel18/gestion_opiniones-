'use strict';

import { initServer } from './configs/app.js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Inicializar servidor
initServer();
