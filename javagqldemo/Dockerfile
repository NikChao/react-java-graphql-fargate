# Use an officil OpenJDK 21 runtime as a parent image
FROM alpine/java:21-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the jar file into the container
COPY build/libs/javagqldemo-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port that the app runs on
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
