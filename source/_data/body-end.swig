<!-- Arknights credit -->
<script>
(function(){
  var footer = document.querySelector('.footer');
  if (!footer) return;
  var credit = document.createElement('div');
  credit.className = 'arknights-credit';
  credit.style.cssText = 'margin-top:6px;font-size:12px;color:#999;text-align:center;';
  credit.innerHTML = 'Inspired by <a href="https://ak.hypergryph.com/" target="_blank" style="color:#999;">Arknights / 明日方舟</a> &copy; Hypergryph / Studio Montagne';
  footer.appendChild(credit);
})();
</script>
