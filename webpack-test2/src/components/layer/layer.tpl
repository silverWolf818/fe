<div class="layer">
    <img src="${ require('../../assets/icon-blue.png')  }">
    <div>this is <%= name %></div>
    <% for (var i = 0; i < arr.length; i++){ %>
    <%= arr[i] %>
    <% } %>
</div>