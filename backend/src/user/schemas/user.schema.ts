import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: '' })
    firstName: string;

    @Prop({ default: '' })
    lastName: string;

    @Prop({ default: '' })
    avatar_url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;

UserSchema.index({ email: 1 });

UserSchema.pre('save', async function (next) {
    const user = this as UserDocument;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hashSync(user.password, salt);

    return next()
})