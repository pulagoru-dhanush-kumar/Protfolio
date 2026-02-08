// Small script to set dynamic bits or add future interactivity.
(function(){
  var nameEl = document.getElementById('name');
  if(nameEl && !nameEl.textContent.trim()){
    nameEl.textContent = 'Dhanush Kumar Pulagoru';
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // Copy email button
  var copyBtn = document.getElementById('copyEmail');
  var emailLink = document.getElementById('emailLink');
  if(copyBtn && emailLink){
    copyBtn.addEventListener('click', function(){
      var email = (emailLink.getAttribute('href') || '').replace('mailto:','');
      if(!email) return;
      navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(email).then(function(){
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(function(){ copyBtn.innerHTML = '<i class="fas fa-clipboard"></i>'; }, 1800);
      }) : alert('Copy: ' + email);
    });
  }

  // Ensure mailto links open the mail client (avoid opening a blank new tab)
  document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){
    a.addEventListener('click', function(e){
      // stop any default that might open a new tab and force navigator to use mail client
      e.preventDefault();
      var href = this.getAttribute('href');
      if(!href) return;
      // Use location.href which triggers the OS/browser mail handler
      window.location.href = href;
    });
  });

  // Avatar click pulse
  var avatar = document.getElementById('avatar');
  if(avatar){
    avatar.addEventListener('click', function(){
      avatar.style.transform = 'translateY(-6px) scale(1.05)';
      setTimeout(function(){ avatar.style.transform = ''; }, 320);
    });
  }
})();