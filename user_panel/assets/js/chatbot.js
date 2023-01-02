window.watsonAssistantChatOptions = {
    integrationID: "54db219b-ef89-4894-a99f-c9fe3b9f5b80", // The ID of this integration.
    region: "us-south", // The region your integration is hosted in.
    serviceInstanceID: "085d9d9b-52cc-4bba-a0b9-f83e7a74e70a", // The ID of your service instance.
    onLoad: function(instance) { instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
  