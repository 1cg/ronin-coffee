<%@ params(CoffeeScript:IReentrant)%>
<html>
  <body>
    <h1>Yay</h1>
    <script>
      <% using(CoffeeScript) { %>
        alert "Yay" if true
      <% } %>
    </script>
  </body>
</html>