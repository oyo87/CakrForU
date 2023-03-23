FROM azul/zulu-openjdk-alpine:11.0.17 AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootjar

FROM azul/zulu-openjdk-alpine:11.0.17
COPY --from=builder build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
COPY ./src/main/resources/application.yml src/main/resources
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]