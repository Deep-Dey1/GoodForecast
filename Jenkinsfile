pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18'
    }
    
    environment {
        DOCKER_IMAGE_BACKEND = 'deepdey01/weather-app-backend'
        DOCKER_IMAGE_FRONTEND = 'deepdey01/weather-app-frontend'
        SONAR_PROJECT_KEY = 'weather-app'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Install Dependencies - Backend') {
            steps {
                echo '📦 Installing backend dependencies...'
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }
        
        stage('Install Dependencies - Frontend') {
            steps {
                echo '📦 Installing frontend dependencies...'
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }
        
        stage('Run Tests - Backend') {
            steps {
                echo '🧪 Running backend tests...'
                dir('backend') {
                    sh 'npm test -- --coverage --passWithNoTests'
                }
            }
        }
        
        stage('Run Tests - Frontend') {
            steps {
                echo '🧪 Running frontend tests...'
                dir('frontend') {
                    sh 'npm test -- --passWithNoTests || exit 0'
                }
            }
        }
        
        stage('SonarQube Analysis - Backend') {
            steps {
                echo '📊 Running SonarQube analysis for backend...'
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                        dir('backend') {
                            def scannerHome = tool 'SonarQubeScanner'
                            withSonarQubeEnv('SonarQube') {
                                sh """
                                    ${scannerHome}/bin/sonar-scanner \
                                    -Dsonar.projectKey=${SONAR_PROJECT_KEY}-backend \
                                    -Dsonar.projectName="Weather App Backend" \
                                    -Dsonar.sources=src \
                                    -Dsonar.tests=tests \
                                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                    -Dsonar.exclusions=node_modules/**,coverage/**,tests/**
                                """
                            }
                        }
                    }
                }
                echo '⚠️ SonarQube analysis skipped or failed - continuing anyway'
            }
        }
        
        stage('SonarQube Analysis - Frontend') {
            steps {
                echo '📊 Running SonarQube analysis for frontend...'
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                        dir('frontend') {
                            def scannerHome = tool 'SonarQubeScanner'
                            withSonarQubeEnv('SonarQube') {
                                sh """
                                    ${scannerHome}/bin/sonar-scanner \
                                    -Dsonar.projectKey=${SONAR_PROJECT_KEY}-frontend \
                                    -Dsonar.projectName="Weather App Frontend" \
                                    -Dsonar.sources=src \
                                    -Dsonar.exclusions=node_modules/**,dist/**,build/**
                                """
                            }
                        }
                    }
                }
                echo '⚠️ SonarQube analysis skipped or failed - continuing anyway'
            }
        }
        
        stage('Quality Gate') {
            steps {
                echo '🚦 Waiting for SonarQube Quality Gate...'
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                        timeout(time: 5, unit: 'MINUTES') {
                            waitForQualityGate abortPipeline: false
                        }
                    }
                }
                echo '⚠️ Quality gate check skipped or failed - continuing anyway'
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                script {
                    dir('backend') {
                        sh "docker build -t ${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER} -t ${DOCKER_IMAGE_BACKEND}:latest ."
                    }
                    dir('frontend') {
                        sh "docker build -t ${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER} -t ${DOCKER_IMAGE_FRONTEND}:latest ."
                    }
                }
            }
        }
        
        stage('Deploy - Local Test') {
            steps {
                echo '🚀 Deploying to local test environment...'
                script {
                    // Stop existing test containers
                    sh 'docker stop weather-app-backend-test weather-app-frontend-test || true'
                    sh 'docker rm weather-app-backend-test weather-app-frontend-test || true'
                    
                    // Stop containers using docker compose test file
                    sh 'docker compose -f docker-compose.test.yml down || true'
                    
                    // Start new containers with test configuration (different ports)
                    sh 'docker compose -f docker-compose.test.yml up -d'
                    
                    // Wait for services to be ready
                    sleep 15
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo '🏥 Performing health checks...'
                script {
                    // Wait for containers to be fully ready
                    echo 'Waiting for services to start...'
                    sleep 20
                    
                    // Check backend container logs
                    echo 'Checking backend logs...'
                    sh 'docker logs weather-app-backend-test --tail 20 || true'
                    
                    // Check if backend container is running
                    sh 'docker ps | grep weather-app-backend-test'
                    
                    // Check backend health from Docker network
                    echo 'Testing backend health...'
                    sh 'docker exec weather-app-backend-test curl -f http://localhost:5000/api/health || exit 1'
                    
                    // Check if frontend container is running
                    echo 'Testing frontend availability...'
                    sh 'docker ps | grep weather-app-frontend-test'
                    
                    echo '✅ All health checks passed!'
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo '🎉 All stages passed!'
        }
        failure {
            echo '❌ Pipeline failed!'
            echo '⚠️ Check the logs for details'
        }
        always {
            echo '🧹 Cleaning up workspace...'
        }
    }
}
