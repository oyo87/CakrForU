pipeline {
    agent any

    environment {
        // Replace with your Docker Hub username and repository name
        DOCKER_HUB_REPO_FRONTEND = 'fleur75/cakeforu'
        DOCKER_HUB_REPO_BACKEND = 'fleur75/cakeforuapi'
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

        stage('Copy application.yml') {
            steps {
                sh 'cp /home/ubuntu/S08P22A604/backend/src/main/resources/application.yml ${WORKSPACE}/backend/src/main/resources/'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build frontend image
                    dir('frontend') {
                        // Copy the /etc/letsencrypt directory from the build system to the workspace
                        sh 'cp -R /etc/letsencrypt .'
                        sh "docker build -t ${DOCKER_HUB_REPO_FRONTEND}:latest ."
                    }
                    // Build backend image
                    dir('backend') {
                        sh "docker build -t ${DOCKER_HUB_REPO_BACKEND}:latest ."
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker Hub using --password-stdin
                    sh 'echo $DOCKER_HUB_CREDS_PSW | docker login -u $DOCKER_HUB_CREDS_USR --password-stdin $CONTAINER_REGISTRY'

                    // Push frontend Docker image to Docker Hub
                    sh "docker push ${DOCKER_HUB_REPO_FRONTEND}:latest"

                    // Push backend Docker image to Docker Hub
                    sh "docker push ${DOCKER_HUB_REPO_BACKEND}:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // SSH into the target server, pull the image, and deploy the new container
                    sh """
                        ssh -i /var/lib/jenkins/.ssh/J8A604T.pem -o StrictHostKeyChecking=no ubuntu@3.34.141.245 <<-EOF
                        # Pull frontend Docker image from Docker Hub
                        docker pull ${DOCKER_HUB_REPO_FRONTEND}:latest
                        # Pull backend Docker image from Docker Hub
                        docker pull ${DOCKER_HUB_REPO_BACKEND}:latest

                        # Stop and remove the existing container (if any)
                        docker rm -f cakeforu_frontend || true
                        docker rm -f cakeforu_backend || true

                        # Run the new container using the pulled image
                        docker run -d --name cakeforu_frontend -p 80:80 -v /var/www/certbot:/var/www/certbot --network my_network ${DOCKER_HUB_REPO_FRONTEND}:latest
                        docker run -d --name cakeforu_backend -p 8080:8080 --network my_network ${DOCKER_HUB_REPO_BACKEND}:latest

EOF
                    """
                }
            }
        }
    }
}
