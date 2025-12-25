$(document).ready(function() {
            $('#registrationForm').on('submit', function(e) {
                e.preventDefault();
                
                // Validate form
                if(validateForm()) {
                    // Collect form data
                    const formData = collectFormData();
                    
                    // Display success message
                    $('#successMessage').slideDown();
                    setTimeout(() => $('#successMessage').slideUp(), 3000);
                    
                    // Display collected data
                    displayResults(formData);
                }
            });
        });

        function validateForm() {
            let isValid = true;
            
            // Clear previous errors
            $('.form-group').removeClass('invalid');
            
            // Validate required fields
            const firstName = $('#firstName').val().trim();
            const lastName = $('#lastName').val().trim();
            const email = $('#email').val().trim();
            const qualification = $('#qualification').val();
            const terms = $('#terms').is(':checked');
            
            if(!firstName) {
                markInvalid($('#firstName'));
                isValid = false;
            }
            
            if(!lastName) {
                markInvalid($('#lastName'));
                isValid = false;
            }
            
            if(!email || !isValidEmail(email)) {
                markInvalid($('#email'));
                isValid = false;
            }
            
            if(!qualification) {
                markInvalid($('#qualification'));
                isValid = false;
            }
            
            if(!terms) {
                markInvalid($('#terms'));
                isValid = false;
            }
            
            // Validate phone if provided
            const phone = $('#phone').val().trim();
            if(phone && !isValidPhone(phone)) {
                markInvalid($('#phone'));
                isValid = false;
            }
            
            return isValid;
        }

        function markInvalid(element) {
            element.closest('.form-group').addClass('invalid');
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidPhone(phone) {
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone.replace(/\D/g, ''));
        }

        function collectFormData() {
            const interests = [];
            $('input[name="interests"]:checked').each(function() {
                interests.push($(this).val());
            });
            
            return {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                phone: $('#phone').val() || 'Not provided',
                dob: $('#dob').val() || 'Not provided',
                qualification: $('#qualification').val(),
                interests: interests.length > 0 ? interests.join(', ') : 'None selected',
                gender: $('input[name="gender"]:checked').val() || 'Not specified',
                address: $('#address').val() || 'Not provided'
            };
        }

        function displayResults(data) {
            let html = '<div class="display-section">';
            
            html += '<div class="display-group">';
            html += '<div class="display-label">Full Name</div>';
            html += '<div class="display-value">' + escapeHtml(data.firstName + ' ' + data.lastName) + '</div>';
            html += '</div>';
            
            html += '<div class="display-group">';
            html += '<div class="display-label">Email Address</div>';
            html += '<div class="display-value">' + escapeHtml(data.email) + '</div>';
            html += '</div>';
            
            html += '<div class="display-group">';
            html += '<div class="display-label">Phone Number</div>';
            html += '<div class="display-value">' + escapeHtml(data.phone) + '</div>';
            html += '</div>';
            
            html += '<div class="display-group">';
            html += '<div class="display-label">Date of Birth</div>';
            html += '<div class="display-value">' + escapeHtml(data.dob) + '</div>';
            html += '</div>';
            
            html += '<div class="display-group">';
            html += '<div class="display-label">Qualification</div>';
            html += '<div class="display-value">' + escapeHtml(data.qualification) + '</div>';
            html += '</div>';
            
            html += '<div class="display-group">';
            html += '<div class="display-label">Gender</div>';
            html += '<div class="display-value">' + escapeHtml(data.gender) + '</div>';
            html += '</div>';
            
            html += '<div class="display-group">';
            html += '<div class="display-label">Areas of Interest</div>';
            html += '<div class="display-value">' + escapeHtml(data.interests) + '</div>';
            html += '</div>';
            
            html += '<div class="display-group">';
            html += '<div class="display-label">Address</div>';
            html += '<div class="display-value">' + escapeHtml(data.address) + '</div>';
            html += '</div>';
            
            html += '</div>';
            
            $('#displayContent').html(html);
            
            // Switch views
            $('#formSection').addClass('hidden');
            $('#displaySection').removeClass('hidden');
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function goBack() {
            $('#displaySection').addClass('hidden');
            $('#formSection').removeClass('hidden');
        }