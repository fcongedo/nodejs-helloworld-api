pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nodejs-helloworld-api'
        CONTAINER_NAME = 'helloworld-container'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                // Construir la imagen de Docker
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Docker Container') {
            steps {
                // Ejecutar el contenedor
                sh "docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}"
            }
        }

        stage('Test Application') {
            steps {
                script {
                    // Esperar un momento para que la aplicación esté lista
                    sleep(time: 5, unit: 'SECONDS')
                    // Realizar una solicitud CURL para verificar la respuesta
                    def curlOutput = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/", returnStdout: true).trim()
                    echo "curlOutput: ${curlOutput}"

                    // Verificar si el código de respuesta es 200
                    if (curlOutput == '200') {
                        currentBuild.result = 'SUCCESS'
                    } else {
                        currentBuild.result = 'FAILURE'
                        error("El código de respuesta no es 200, en su lugar es ${curlOutput}")
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Ejecutar los tests utilizando Jest dentro del contenedor
                sh "docker exec ${CONTAINER_NAME} npm test -- --forceExit"
            }
        }

        stage('Stop and Remove Container') {
            steps {
                // Detener y eliminar el contenedor
                //sh "docker stop ${CONTAINER_NAME} || true"
                //sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completado exitosamente.'
        }
        failure {
            echo 'El pipeline falló.'
        }
    }
}
