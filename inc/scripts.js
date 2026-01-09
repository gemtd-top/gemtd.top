// Cookie consent modal
(function() {
    if (!localStorage.getItem('cookieConsent')) {
        var overlay = document.createElement('div');
        overlay.id = 'cookieOverlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);display:flex;justify-content:center;align-items:center;z-index:9999;';

        var modal = document.createElement('div');
        modal.style.cssText = 'background:#fff;padding:25px 30px;border-radius:8px;max-width:400px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.3);';
        modal.innerHTML = '<h3 style="margin:0 0 15px;color:#333;font-size:18px;">Cookie Notice</h3>' +
            '<p style="margin:0 0 20px;color:#666;font-size:14px;line-height:1.5;">This website uses cookies for analytics and traffic data purposes only.</p>' +
            '<button id="cookieOk" style="background:#4CAF50;color:#fff;border:none;padding:10px 30px;border-radius:4px;cursor:pointer;font-size:14px;">OK</button>';

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById('cookieOk').onclick = function() {
            if (typeof gtag === 'function') {
                gtag('event', 'cookie_consent', { 'event_category': 'engagement', 'event_label': 'accepted' });
            }
            localStorage.setItem('cookieConsent', 'true');
            overlay.remove();
        };
    }
})();

// Set up localStorage to track acquired gems
$(document).ready(function() {
    // Check if data exists in localStorage
    if (localStorage.getItem('acquiredGems')) {
        const acquired = JSON.parse(localStorage.getItem('acquiredGems'));
        // Apply acquired class to saved gems
        $('.gem-cell').each(function(index) {
            if (acquired[index]) {
                $(this).addClass('acquired');
            }
        });
    } else {
        // Initialize localStorage with empty data
        const acquired = Array($('.gem-cell').length).fill(false);
        localStorage.setItem('acquiredGems', JSON.stringify(acquired));
    }

    // Handle clicking on gems to toggle acquired state
    $('.gem-cell').on('click', function() {
        const acquired = JSON.parse(localStorage.getItem('acquiredGems'));
        const index = $('.gem-cell').index(this);
        acquired[index] = !acquired[index];
        localStorage.setItem('acquiredGems', JSON.stringify(acquired));
    });

    // Reset all button
    $('#resetAll').on('click', function() {
        if (confirm('Are you sure you want to reset all acquired gems?')) {
            $('.gem-cell').removeClass('acquired');
            const acquired = Array($('.gem-cell').length).fill(false);
            localStorage.setItem('acquiredGems', JSON.stringify(acquired));
        }
    });

    // Info modal
    $('#infoModal').on('show.bs.modal', function (event) {
        const trigger = $(event.relatedTarget);
        const info = trigger.data('info');
        $('#infoModalBody').text(info);
    });

    // Mobile builder toggle
    function hideBuilder() {
        $('#mobile-builder-iframe').hide();
        $('.hide-builder-btn').hide();
        $('#showBuilder').show();
    }

    function showBuilder() {
        $('#mobile-builder-iframe').show();
        $('.hide-builder-btn').show();
        $('#showBuilder').hide();
    }

    $('#hideBuilderTop, #hideBuilderBottom').on('click', function() {
        hideBuilder();
    });

    $('#showBuilder').on('click', function() {
        showBuilder();
    });

    // Listen for height messages from builder iframe
    window.addEventListener('message', function(e) {
        if (e.data && e.data.type === 'builderHeight') {
            $('#mobile-builder-iframe').css('height', e.data.height + 'px');
        }
    });

});
