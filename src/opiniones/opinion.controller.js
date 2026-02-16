import Opinion from './opinion.model.js';

// Crear opinión
export const createOpinion = async (req, res) => {
    try {
        const data = req.body;
        data.usuario = req.user._id; // viene del login
        const opinion = new Opinion(data);
        await opinion.save();
        res.status(201).json({ success: true, message: 'Opinión creada', data: opinion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear opinión', error: error.message });
    }
};

// Obtener todas las opiniones
export const getOpiniones = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const opiniones = await Opinion.find()
            .populate('usuario', 'name email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
        const total = await Opinion.countDocuments();
        res.status(200).json({
            success: true,
            data: opiniones,
            pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalRecords: total, limit }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener opiniones', error: error.message });
    }
};

// Actualizar opinión
export const updateOpinion = async (req, res) => {
    try {
        const { id } = req.params;
        const opinion = await Opinion.findOneAndUpdate({ _id: id, usuario: req.user._id }, req.body, { new: true });
        if (!opinion) return res.status(404).json({ success: false, message: 'Opinión no encontrada o no pertenece al usuario' });
        res.status(200).json({ success: true, message: 'Opinión actualizada', data: opinion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar opinión', error: error.message });
    }
};

// Eliminar opinión
export const deleteOpinion = async (req, res) => {
    try {
        const { id } = req.params;
        const opinion = await Opinion.findOneAndDelete({ _id: id, usuario: req.user._id });
        if (!opinion) return res.status(404).json({ success: false, message: 'Opinión no encontrada o no pertenece al usuario' });
        res.status(200).json({ success: true, message: 'Opinión eliminada', data: opinion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar opinión', error: error.message });
    }
};
