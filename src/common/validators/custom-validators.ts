import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidSocialURL(validationOptions?: ValidationOptions) {
    const socialMediaTypes = [
        { type: 'soundcloud', url: 'https://soundcloud.com/' },
        { type: 'spotify', url: 'https://open.spotify.com/' },
        { type: 'instagram', url: 'https://instagram.com/' }
    ];

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
