import { CacheKey, Deserializer, Serializer } from "json-object-mapper";

@CacheKey("NumberSerializerDeserializer")
export class NumberSerializerDeserializer implements Deserializer, Serializer{
    deserialize = (value: string): number => {
        return Number.parseInt(value);
    }
    serialize = (value: string): number => {
        return Number.parseInt(value);
    }
}