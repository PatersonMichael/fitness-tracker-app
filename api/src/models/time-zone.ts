import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITimeZone {
    countryName: string;
    countryCode2: string;
    timeZone: string;
    utcOffset: string;
    description: string;
}

interface ITimeZoneDocument extends ITimeZone, Document {
};

interface ITimeZoneModel extends Model<ITimeZoneDocument> {
};

const TimeZoneSchema: Schema<ITimeZoneDocument> = new Schema({
    countryName: {
        type: String,
        required: true
    },
    countryCode2: {
        type: String,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    },
    utcOffset: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const TimeZone = mongoose.model<ITimeZoneDocument, ITimeZoneModel>(
    'TimeZone',
    TimeZoneSchema,
);

export default TimeZone;

