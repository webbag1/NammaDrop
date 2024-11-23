        let currentStep = 1;
        const totalSteps = 5;
        const formData = {};

        function updateButtons() {
            document.getElementById('prevBtn').disabled = currentStep === 1;
            const nextBtn = document.getElementById('nextBtn');
            nextBtn.textContent = currentStep === totalSteps ? 'Submit' : 'Next';
        }

        function updateProgressBar() {
            document.querySelectorAll('.progress-step').forEach((step, index) => {
                step.classList.toggle('active', index + 1 <= currentStep);
            });
        }

        function showStep(step) {
            document.querySelectorAll('.form-step').forEach(s => {
                s.classList.remove('active');
            });
            document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
        }

        function validateStep() {
            const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            const requiredFields = currentStepElement.querySelectorAll('[required]');
            let valid = true;

            requiredFields.forEach(field => {
                const errorMessage = field.nextElementSibling;
                if (!field.value) {
                    valid = false;
                    field.classList.add('validation-error');
                    if (errorMessage?.classList.contains('error-message')) {
                        errorMessage.style.display = 'block';
                    }
                } else {
                    field.classList.remove('validation-error');
                    if (errorMessage?.classList.contains('error-message')) {
                        errorMessage.style.display = 'none';
                    }
                }
            });

            return valid;
        }

        function collectFormData() {
            // Building Details
            formData.buildingName = document.getElementById('buildingName').value;
            formData.address = document.getElementById('address').value;
            formData.floors = document.getElementById('floors').value;
            formData.buildingType = document.getElementById('buildingType').value;
            formData.constructionYear = document.getElementById('constructionYear').value;

            // Water Infrastructure
            formData.undergroundTanks = document.getElementById('undergroundTanks').value;
            formData.overheadTanks = document.getElementById('overheadTanks').value;
            formData.apartmentTanks = document.getElementById('apartmentTanks').value;
            formData.tankCapacity = document.getElementById('tankCapacity').value;
            formData.waterSource = document.getElementById('waterSource').value;

            // Resident Information
            formData.totalUnits = document.getElementById('totalUnits').value;
            formData.avgResidents = document.getElementById('avgResidents').value;
            formData.commonAreas = Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
                .filter(cb => ['garden', 'gym', 'pool', 'other'].includes(cb.value))
                .map(cb => cb.value);

            // Monitoring Preferences
            formData.monitoringFreq = document.getElementById('monitoringFreq').value;
            formData.alertSettings = Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
                .filter(cb => ['usage', 'leakage'].includes(cb.value))
                .map(cb => cb.value);
            formData.notificationMethod = Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
                .filter(cb => ['email', 'sms', 'app'].includes(cb.value))
                .map(cb => cb.value);
        }

        function updateSummary() {
            const summary = document.getElementById('summary');
            summary.innerHTML = `
                <h3>Building Details</h3>
                <p><strong>Building Name:</strong> <span>${formData.buildingName}</span></p>
                <p><strong>Address:</strong> <span>${formData.address}</span></p>
                <p><strong>Number of Floors:</strong> <span>${formData.floors}</span></p>
                <p><strong>Building Type:</strong> <span>${formData.buildingType}</span></p>
                <p><strong>Construction Year:</strong> <span>${formData.constructionYear}</span></p>

                <h3>Water Infrastructure</h3>
                <p><strong>Underground Tanks:</strong> <span>${formData.undergroundTanks}</span></p>
                <p><strong>Overhead Tanks:</strong> <span>${formData.overheadTanks}</span></p>
                <p><strong>Apartment Tanks:</strong> <span>${formData.apartmentTanks}</span></p>
                <p><strong>Tank Capacity:</strong> <span>${formData.tankCapacity} liters</span></p>
                <p><strong>Water Source:</strong> <span>${formData.waterSource}</span></p>

                <h3>Resident Information</h3>
                <p><strong>Total Units:</strong> <span>${formData.totalUnits}</span></p>
                <p><strong>Average Residents per Unit:</strong> <span>${formData.avgResidents}</span></p>
                <p><strong>Common Areas:</strong> <span>${formData.commonAreas.join(', ') || 'None selected'}</span></p>

                <h3>Monitoring Preferences</h3>
                <p><strong>Monitoring Frequency:</strong> <span>${formData.monitoringFreq}</span></p>
                <p><strong>Alert Settings:</strong> <span>${formData.alertSettings.join(', ') || 'None selected'}</span></p>
                <p><strong>Notification Methods:</strong> <span>${formData.notificationMethod.join(', ') || 'None selected'}</span></p>
            `;
        }

        function nextStep() {
            if (currentStep === totalSteps) {
                // Handle form submission
                if (validateStep()) {
                    collectFormData();
                    // Here you would typically send the formData to your server
                    console.log('Form submitted:', formData);
                    alert('Form submitted successfully!');
                }
                return;
            }

            if (validateStep()) {
                collectFormData();
                currentStep++;
                showStep(currentStep);
                updateButtons();
                updateProgressBar();
                if (currentStep === totalSteps) {
                    updateSummary();
                }
            }
        }

        function prevStep() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
                updateButtons();
                updateProgressBar();
            }
        }

        // Initialize form
        document.addEventListener('DOMContentLoaded', function() {
            updateButtons();
            updateProgressBar();
            
            // Add input event listeners for real-time validation
            document.querySelectorAll('input, select').forEach(field => {
                field.addEventListener('input', function() {
                    if (field.hasAttribute('required')) {
                        const errorMessage = field.nextElementSibling;
                        if (field.value) {
                            field.classList.remove('validation-error');
                            if (errorMessage?.classList.contains('error-message')) {
                                errorMessage.style.display = 'none';
                            }
                        }
                    }
                });
            });
        });