using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace WorkManagement.Domain
{
#nullable enable
    public class JsonNullableStringEnumConverter : JsonConverterFactory
    {
        readonly JsonStringEnumConverter stringEnumConverter;

        public JsonNullableStringEnumConverter(JsonNamingPolicy? namingPolicy = null, bool allowIntegerValues = true)
        {
            stringEnumConverter = new(namingPolicy, allowIntegerValues);
        }

        public override bool CanConvert(Type typeToConvert)
            => Nullable.GetUnderlyingType(typeToConvert)?.IsEnum == true;

        public override JsonConverter? CreateConverter(Type typeToConvert, JsonSerializerOptions options)
        {
            var type = Nullable.GetUnderlyingType(typeToConvert)!;
            return (JsonConverter?)Activator.CreateInstance(typeof(ValueConverter<>).MakeGenericType(type),
                stringEnumConverter.CreateConverter(type, options));
        }

        class ValueConverter<T> : JsonConverter<T?>
            where T : struct, Enum
        {
            readonly JsonConverter<T> converter;

            public ValueConverter(JsonConverter<T> converter)
            {
                this.converter = converter;
            }

            public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            {
                if (reader.TokenType == JsonTokenType.Null)
                {
                    reader.Read();
                    return null;
                }
                return converter.Read(ref reader, typeof(T), options);
            }

            public override void Write(Utf8JsonWriter writer, T? value, JsonSerializerOptions options)
            {
                if (value == null)
                    writer.WriteNullValue();
                else
                    converter.Write(writer, value.Value, options);
            }
        }
    }

}
