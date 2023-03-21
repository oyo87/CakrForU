pipeline {
    agent any

    environment {
        // Replace with your Docker Hub username and repository name
        DOCKER_HUB_REPO = 'fleur75/cakeforu'
        // Replace with the URL of your container registry
        CONTAINER_REGISTRY = 'https://index.docker.io/v1/'
        // Add the Docker Hub credentials
        DOCKER_HUB_CREDS = credentials('dockerhub-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your React app's source code from the Git repository
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/develop']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    submoduleCfg: [],
                    userRemoteConfigs: [[
                        credentialsId: 'ssafy',
                        url: 'https://lab.ssafy.com/s08-bigdata-recom-sub2/S08P22A604.git'
                    ]]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_HUB_REPO}:latest ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker Hub using --password-stdin
                    sh "echo ${DOCKER_HUB_CREDS_PSW} | docker login -u ${DOCKER_HUB_CREDS_USR} --password-stdin ${CONTAINER_REGISTRY}"

                    // Push the Docker image to Docker Hub
                    sh "docker push ${DOCKER_HUB_REPO}:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // SSH into the target server, pull the image, and deploy the new container
                    sh """
                        ssh -i /var/lib/jenkins/.ssh/J8A604T.pem -o StrictHostKeyChecking=no ubuntu@3.34.141.245 <<-EOF
                        # Pull the Docker image from Docker Hub
                        docker pull ${DOCKER_HUB_REPO}:latest

                        # Stop and remove the existing container (if any)
                        docker rm -f cakeforu || true

                        # Run the new container using the pulled image
                        docker run -d --name cakeforu -p 80:80 ${DOCKER_HUB_REPO}:latest
EOF
                    """
                }
            }
        }
    }
}
