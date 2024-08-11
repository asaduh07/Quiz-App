import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

// Create and export the Tag model
const TagModel = mongoose.model('Tag', tagSchema);
export default TagModel;
