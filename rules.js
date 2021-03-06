let story = undefined;

function startStory(text) {
  
  /* global jsyaml */
  story = jsyaml.load(text);

  return {
    title: story.Title,
    initialScene: story.Begin
  };
}

function startScene(sceneName) {
  
  let scene = story.Scenes[sceneName];

  if (scene.Choices == undefined) {
    scene.Choices = [];
  }
  /*This code randomizes the captions in the first two scenes on each playthrough*/
  if(scene.Captions != undefined){
    let selection = Math.floor(Math.random() * scene.Captions.length);
    scene.Caption = scene.Captions[selection];
  }

  return {
    imageUrl: scene.Image,
    caption: scene.Caption,
    choices: scene.Choices.map(location => ({
      text: location.Text,
      target: location.Target
    }))
  };
}

