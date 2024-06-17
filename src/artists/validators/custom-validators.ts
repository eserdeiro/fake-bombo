import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { socialMediaTypes } from '../constants/social-media-types';

export function IsValidSocialURL(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidSocialURL',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const { type } = args.object as any;
                    const media = socialMediaTypes.find(media => media.type === type);
                    return media ? value.startsWith(media.url) : false;
                },
                defaultMessage(args: ValidationArguments) {
                    const { type } = args.object as any;
                    const media = socialMediaTypes.find(media => media.type === type);
                    const expectedUrl = media ? media.url : 'a valid URL';
                    return `${type}: The URL must start with ${expectedUrl}.`;
                }
            }
        });
    };
}
