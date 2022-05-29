import { CacheKey, Deserializer, Serializer } from "json-object-mapper";

@CacheKey("DateSerializerDeserializer")
export class DateSerializerDeserializer implements Deserializer, Serializer{
    deserialize = (value: string): Date => {
        return new Date(Date.parse(value));
    }
    serialize = (value: Date): string => {
        return "\"" + value.toISOString() + "\"";
    }
}