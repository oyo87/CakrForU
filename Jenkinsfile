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

        stage('Set up .env') {
            steps {
                dir('frontend') {
                    withCredentials([file(credentialsId: 'env-production', variable: 'ENV_FILE')]) {
                        sh 'cp $ENV_FILE .env'
                    }
                }
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

        stage('Copy certificate files') {
            steps {
                sh 'mkdir -p ${WORKSPACE}/data'
                sh 'cp -r /home/ubuntu/S08P22A604/data/* ${WORKSPACE}/data/'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // SSH into the target server and deploy the containers using Docker Compose
                    sh """
                        scp -i /var/lib/jenkins/.ssh/J8A604T.pem -o StrictHostKeyChecking=no docker-compose.yml ubuntu@3.34.141.245:./
                        scp -i /var/lib/jenkins/.ssh/J8A604T.pem -o StrictHostKeyChecking=no -r data ubuntu@3.34.141.245:./
                        ssh -i /var/lib/jenkins/.ssh/J8A604T.pem -o StrictHostKeyChecking=no ubuntu@3.34.141.245 <<-EOF
                            export DOCKER_HUB_REPO_FRONTEND=${DOCKER_HUB_REPO_FRONTEND}
                            export DOCKER_HUB_REPO_BACKEND=${DOCKER_HUB_REPO_BACKEND}
                            docker-compose pull
                            docker-compose down
                            docker-compose up -d
EOF
                    """
                }
            }
        }
    }
}
