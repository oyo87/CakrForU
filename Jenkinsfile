pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO_FRONTEND = 'fleur75/cakeforu'
        DOCKER_HUB_REPO_BACKEND = 'fleur75/cakeforuapi'
        COMPOSE_PROJECT_NAME = 'cakeforu'
        DOCKER_REGISTRY_URL = 'https://index.docker.io/v1/'
        DOCKER_HUB_CREDS = credentials('dockerhub-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
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

        stage('Build and push Docker images') {
            steps {
                script {
                    // Log in to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD} ${DOCKER_REGISTRY_URL}"
                    }

                    // Build and push the Docker images for the frontend and backend
                    sh "docker-compose build"
                    sh "docker-compose push"
                }
            }
        }

        stage('Copy docker-compose.yml') {
            steps {
                sshagent(credentials: ['jenkins-ssh-credentials']) {
                    sh "scp -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/J8A604T.pem ./docker-compose.yml ubuntu@3.34.141.245:/home/ubuntu/S08P22A604/"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // SSH into the target server and start the Docker Compose stack
                    sshagent(credentials: ['jenkins-ssh-credentials']) {
                        sh "ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/J8A604T.pem ubuntu@3.34.141.245 \"cd /home/ubuntu/S08P22A604 && docker-compose pull && docker-compose up -d\""
                    }
                }
            }
        }
    }
}
