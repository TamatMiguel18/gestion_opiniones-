import Comentario from './comentario.model.js';

// Crear comentario
export const createComentario = async (req, res) => {
    try {
        const data = req.body;
        data.usuario = req.user._id;
        const comentario = new Comentario(data);
        await comentario.save();
        res.status(201).json({ success: true, message: 'Comentario creado', data: comentario });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear comentario', error: error.message });
    }
};

// Obtener comentarios de una opinión
export const getComentarios = async (req, res) => {
    try {
        const { opinionId } = req.params;
        const comentarios = await Comentario.find({ opinion: opinionId }).populate('usuario', 'name email');
        res.status(200).json({ success: true, data: comentarios });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener comentarios', error: error.message });
    }
};

// Actualizar comentario
export const updateComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await Comentario.findOneAndUpdate({ _id: id, usuario: req.user._id }, req.body, { new: true });
        if (!comentario) return res.status(404).json({ success: false, message: 'Comentario no encontrado o no pertenece al usuario' });
        res.status(200).json({ success: true, message: 'Comentario actualizado', data: comentario });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar comentario', error: error.message });
    }
};

// Eliminar comentario
export const deleteComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await Comentario.findOneAndDelete({ _id: id, usuario: req.user._id });
        if (!comentario) return res.status(404).json({ success: false, message: 'Comentario no encontrado o no pertenece al usuario' });
        res.status(200).json({ success: true, message: 'Comentario eliminado', data: comentario });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar comentario', error: error.message });
    }
};
