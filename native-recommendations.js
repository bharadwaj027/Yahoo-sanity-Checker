/* native-recommendations.js
 * Embedded Native (iOS + Android) 'Recommendation to fix' reference.
 * Source: 'Adobe_Yahoo Native Mobile IDL and EBL -  upadted on 15_10_2025.xlsx' (tabs 'native iOS' / 'native Android').
 * Each entry: { platform: 'iOS'|'Android', checkpoint, issueDescription, recommendation }.
 * ecommendation is the sheet's 'Recommendation to fix' column verbatim (already HOW TO FIX +
 * REFERENCE, no RULE/BACKGROUND); any stray RULE/BACKGROUND section is stripped defensively.
 * Both tabs: A=Checkpoint, B=Issue Description, C=Recommendation to fix.
 * Authoritative source of truth for the S14 Native recommendation check. Regenerate from the
 * sheet when it changes (scratchpad generate2.ps1). DO NOT hand-edit recommendation text.
 */
const NATIVE_RECOMMENDATIONS =[
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.a",
        "issueDescription":  "The image is changing dynamically but the text alternative doesn\u0027t correspond to the active image displayed.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityLabel property as the ImageView changes.\nThe play button changes to a pause button:\n\n if ... {\n                myImageView.accessibilityLabel=\"Play\"\n            }else{\n                myImageView.accessibilityLabel=\"Pause\"\n            }\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityLabel method as the Image changes.\nThe play button changes to a pause button:\n\n Image(\"videoPlay\")\n               ......\n                .accessibilityLabel(condition ? \"Play\" : \"Pause\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.a",
        "issueDescription":  "The text alternative does not serve the same purpose as the image.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessibilityLabel property for the active imageview describes its destination, purpose, or function.\n\nmyImageView.accessibilityLabel=\"ABCD logo\" \n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessibilityLabel method for the active Image describes its destination, purpose, or function.\n\nImage(\"logoimage\")\n...\n                    .accessibilityLabel(\"ABCD logo\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.a",
        "issueDescription":  "The text alternative for the active image is missing.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by implementing the accessibilityLabel property on the ImageView to convey the destination, purpose, or function of the image.\n\nmyImageView.accessibilityLabel=\"ABCD logo\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by implementing the accessibilityLabel method on the Image to convey the destination, purpose, or function of the image.\n\nImage(\"logoimage\")\n...\n                    .accessibilityLabel(\"ABCD logo\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.a",
        "issueDescription":  "The text alternative does not contain the essential text in the active image, and therefore does not present the same information as the image.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessibilityLabel property for the active imageview, includes all essential text in the image so it accurately describes its destination, purpose, or function.\n\nmyImageView.accessibilityLabel=\"ABCD logo\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessibilityLabel method for the active Image, includes all essential text in the image so it accurately describes its destination, purpose, or function.\n\nImage(\"logoimage\")\n...\n                    .accessibilityLabel(\"ABCD logo\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "The text alternative does not present the same information as the image.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessibilityLabel property for the informative imageview describes its intent, purpose, or meaning.\n\nmyImageView.accessibilityLabel=\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessibilityLabel method for the informative Image describes its intent, purpose, or meaning.\n\nImage(\"imageName\")\n               ......\n                .accessibilityLabel(\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "The image is changing dynamically but the text alternative doesn\u0027t correspond to the informative image displayed.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityLabel property on the ImageView to convey the intent, purpose, or meaning of the image.\n\nif ... {\n                myImageView.accessibilityLabel=\"20 Percent Off\"\n            }else{\n                myImageView.accessibilityLabel=\"Buy One Get One Free\"\n            }\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityLabel method on the Image to convey the intent, purpose, or meaning of the image.\n\n Image(\"imageName\")\n               ......\n                .accessibilityLabel(condition ? \"20 Percent Off\" : \"Buy One Get One Free\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "The text alternative for the informative image is missing.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by doing ALL of the following:  \n1. Use the isAccessibilityElement property to make the ImageView accessible for screen readers.\n2. Use the accessibilityLabel property on the ImageView to convey the intent, purpose, or meaning of the image.\n\nimageView.isAccessibilityElement = true\nimageView.accessibilityLabel = \" Update the alternative text of the image\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by doing ALL of the following: \n1.  If Image is implemented with accessibilityHidden method as true then change the accessibilityHidden method to false.\n2.  Use the accessibilityLabel property on the Image to convey the intent, purpose, or meaning of the image.\n\nImage(\"imageName\")\n...... \n.accessibilityLabel(“Update the alternative text of the image”)\n\nOR\n\nImage(\"imageName\")\n.accessibilityHidden(false)\n...... \n.accessibilityLabel(“Update the alternative text of the image”)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "The text alternative for the informative image is missing.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the accessibilityLabel property on the ImageView component to convey the intent, purpose, or meaning of the image.\n\nmyImageView.accessibilityLabel=\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityLabel method on the Image component to convey the intent, purpose, or meaning of the image.\n\n Image(\"imageName\")\n               ......\n                .accessibilityLabel(\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "The text alternative does not contain the essential text in the informative image, and therefore does not present the same information as the image.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessibilityLabel property for the informative imageview includes all essential text in the image so it describes its intent, purpose, or meaning.\n\nmyImageView.accessibilityLabel=\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessibilityLabel method for the informative Image includes all essential text in the image so it describes its intent, purpose, or meaning.\n\n Image(\"imageName\")\n               ......\n                .accessibilityLabel(\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "The complex image is missing both short and detailed text alternatives.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by providing both a short text alternative on the image itself and a complete long description.\n\nTo provide a short text alternative for the image, use the following technique:\n\n1. Use the accessibilityLabel property on the ImageView component to convey the intent, purpose, or meaning of the image.\n\nmyImageView.accessibilityLabel=\"Bar chart with percentages. Detailed description below chart.\"\n\nProvide a complete long description using ONE of the following techniques:\n\n1. Provide the long description in the context of the screen itself.\n2. Provide a button that expands a collapsed region that contains the long description.\n3. Provide a button to open a dialog that contains the long description.\n4. Provide a link to a long description on another screen via a normal link text.\n\nHOW TO FIX: SwiftUI:\nFix this issue by providing both a short text alternative on the image itself and a complete long description.\n\nTo provide a short text alternative for the image, use the following technique:\n\n1. Use the accessibilityLabel method on the ImageView component to convey the intent, purpose, or meaning of the image.\n\nImage(\"imageName\")\n...... \n.accessibilityLabel(“Bar chart with percentages. Detailed description below chart.\")\n\nProvide a complete long description using ONE of the following techniques:\n\n1. Provide the long description in the context of the screen itself.\n2. Provide a button that expands a collapsed region that contains the long description.\n3. Provide a button to open a dialog that contains the long description.\n4. Provide a link to a long description on another screen via a normal link text.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "The detailed textual description of the complex image is not adequate to convey its full meaning.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the image\u0027s text description is accurate and includes all of the complex image\u0027s information.\n\nmyImageView.accessibilityLabel=\"A bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the image\u0027s text description is accurate and includes all of the complex image\u0027s information.\n\nImage(\"imageName\")\n...... \n.accessibilityLabel(“A bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "The detailed textual description of the complex image is missing.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using ONE of the following techniques:\n1. Fix this issue by providing a detailed textual description of the complex imageview via accessibilityLabel\n1.1. complexImage.isAccessibilityElement = true\n1.2. complexImage.accessibilityLabel = \"a bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\"\n2. Provide the detailed description in the context of the page itself.\n3. Provide a button that expands a collapsed region that contains the detailed description.\n4. Provide a button to open a dialog that contains the detailed description.\n5. Provide accessible dynamic charts\n\nHOW TO FIX: SwiftUI:\nFix this issue by using ONE of the following techniques:\n1. Fix this issue by providing a detailed textual description of the complex image via accessibilityLabel\n1.1 Image(\"imageName\")\n.accessibilityHidden(true)\n1.2 Image(\"imageName\")\n...... \n.accessibilityLabel(“A bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\")\n2. Provide the detailed description in the context of the page itself.\n3. Provide a button that expands a collapsed region that contains the detailed description.\n4. Provide a button to open a dialog that contains the detailed description.\n5. Provide accessible dynamic charts\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "A short text alternative for a complex image is missing.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by implementing accessibilityLabel property on the ImageView to convey the intent, purpose, or meaning of the image.\n\nmyImageView.accessibilityLabel=\"A bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by implementing accessibilityLabel method on the Image to convey the intent, purpose, or meaning of the image.\n\nImage(\"imageName\")\n...... \n.accessibilityLabel(“A bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "The short text alternative for the complex image is not appropriate or meaningful.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessibilityLabel property for the imageview gives a meaningful description of the main purpose or content of the image and refers to the location of the long description.\n\nmyImageView.accessibilityLabel=\"Sales results by quarter. The extended description is below the chart\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessibilityLabel method for the Image gives a meaningful description of the main purpose or content of the image and refers to the location of the long description.\n\nImage(\"imageName\")\n...... \n.accessibilityLabel(“Sales results by quarter. The extended description is below the chart\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.d",
        "issueDescription":  "The decorative image is not hidden from screen readers.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by implementing the isAccessibilityElement property of the ImageView to false.\n\nimageView.isAccessibilityElement = false.\n\nHOW TO FIX: SwiftUI:\nFix this issue by doing one of the following:\n1. Use decorative API while using an image. \n2. Use the accessibilityHidden method of the ImageView to true.\n\n Image(decorative: \"ilt_info\")\nOr \nImage(\"imageName\")\n.accessibilityHidden(true)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)\nhttps://developer.apple.com/documentation/swiftui/image/init(decorative:bundle:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.h",
        "issueDescription":  "The text alternative is not appropriate.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessibilityLabel property for the media file object accurately describes the purpose or title of the media content.\n\nfileObject.accessibilityLabel=\"The Audio file about Accessibility Features\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessibilityLabel method for the media file object accurately describes the purpose or title of the media content.\n\nfileObject\n .accessibilityLabel(\"The Audio file about Accessibility Features\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.1.1.h",
        "issueDescription":  "There is no text alternative to describe the media file.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessibilityLabel property for the media file object accurately describes the purpose or title of the media content.\n\nfileObject.accessibilityLabel=\"The Audio file about Accessibility Features\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessibilityLabel method for the media file object accurately describes the purpose or title of the media content.\n\nfileObject\n .accessibilityLabel(\"The Audio file about Accessibility Features\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "No text transcript is provided.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing a complete and accurate text transcript for the audio file."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "A text transcript is provided, but it is incorrect or inadequate.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing a complete and accurate text transcript for the audio content"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "A text transcript is provided but it doesn\u0027t describe all important sound effects.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing a complete and accurate text transcript for the audio file including all background sounds, sound effects, background music, and other descriptions like a person\u0027s tone."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "A text transcript is provided but it doesn\u0027t identify all the speakers.",
        "recommendation":  "HOW TO FIX:Swift/SwiftUI:\nFix this issue by providing a complete and accurate text transcript for the audio file including the identity of each speaker."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "A text transcript is provided but some of the dialogue is missing.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing a complete and accurate text transcript for the audio file."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.1.b",
        "issueDescription":  "A text or audio description is provided, but it does not adequately describe the video content.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing adequate Text Transcript and Audio description for the video file."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.1.b",
        "issueDescription":  "Neither a text description nor audio description is available for video-only content",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix the issue by providing text description OR audio description for visual content."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are not provided for the recorded multimedia content.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adding complete, accurate, synchronized captions (open or closed) to the multimedia content."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded media, but they are incorrect or inadequate.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions provide a complete and accurate description of all dialogue, speakers, and important background sounds."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded multimedia, but they are not synchronized with the multimedia.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by synchronizing captions with the video."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded multimedia, but they are difficult to read due to poor contrast between the captions and their background.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions have adequate contrast with their background."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded media, but some of the dialogue is missing.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions provide a complete and accurate description of all dialogue."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded multimedia, but they do not describe all important sound effects.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions include a description of all important background sounds"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded multimedia, but they do not identify all the speakers.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions identify all speakers under the following conditions:\n\n1. If the speaker is offscreen\n\n2. If multiple speakers are present within the same frame\n\n3. If there are other times when a speaker in the video isn\u0027t obvious"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.3.a",
        "issueDescription":  "The audio description provided is not correct or is inadequate.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the audio description conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.3.a",
        "issueDescription":  "Neither a text description nor audio description is available for multimedia content.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using ONE of the following techniques:\n\n1. Text Transcript: A full-text description that conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc.\n\n2. Audio Description: A synchronized soundtrack with an audio description that conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.3.a",
        "issueDescription":  "The text description provided is not correct or is inadequate.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the text transcript conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are not provided  for the live multimedia content.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adding complete, accurate, synchronized captions to the multimedia content."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live media, but they are incorrect or inadequate.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions provide a complete and accurate description of all dialogue, background sounds, speakers, and important background sounds."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live multimedia, but they are not synchronized with the multimedia.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by synchronizing captions with the video."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live multimedia, but they are difficult to read due to poor contrast between the captions and their background.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions have adequate contrast with their background."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live media, but some of the dialogue is missing.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions provide a complete and accurate description of all dialogue"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live multimedia, but they do not describe all important sound effects.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions include a description of all important background sounds."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live multimedia,  but they do not identify all the speakers.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the captions identify all speakers under the following conditions:\n\n1. If the speaker is offscreen\n\n2. If multiple speakers are present within the same frame\n\n3. If there are other times when a speaker in the video isn\u0027t obvious"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.5.a",
        "issueDescription":  "The audio description provided is not correct or is inadequate.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the audio description conveys all significant visual information such as scenes, significant actions, text on the screen, facial expressions, etc."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.2.5.a",
        "issueDescription":  "An audio description is not provided.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by including an audio description that conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.a",
        "issueDescription":  "Information, structure, or relationship is presented visually but is not conveyed programmatically or in text.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by doing ONE OR MORE of the following:\n1. Use a text-based method to convey the meaning of the visual information or relationship. The text can be provided for screen readers only or be visible on screen.\n2. When available use appropriate standard native components.\n3. Use the accessibilityLabel property to provide programmatic information for the screen readers.   \n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)\nhttps://developer.apple.com/documentation/swiftui/image/init(decorative:bundle:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.a",
        "issueDescription":  "Semantic markup has been used inappropriately and misrepresents the meaning, structure, or relationships of the content.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by removing incorrect semantic coding which is used for navigation and / or visual styling – such as shouldGroupAccessibilityChildren method to make incorrect screen reader navigation.\n\nHOW TO FIX: SwiftUI:\nFix this issue by removing incorrect semantic coding which is used for navigation and/or visual styling – such as .accessibilityElement(children: .....) method to make incorrect screen reader navigation.\n\nREFERENCE:\nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject-swift.class/shouldgroupaccessibilitychildren\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityelement(children:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.a",
        "issueDescription":  "Incorrect semantic markup is used.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using the correct semantic code for the component. See Issue Details for more information."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.a",
        "issueDescription":  "Text that is shown visually as being deleted or inserted is not identified for screen readers either programmatically or in text.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by the accessibilityLabel property on the view object to convey that its deleted item.\n\nviewofPrice.isAccessibilityElement = true\nviewofPrice.accessibilityLabel = \"Price reduced! Old Price $ 100, New Price $ 75\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by the accessibilityLabel method on the view object to convey that it’s deleted item.\n\nviewofPrice\n.accessibilityLabel(\"Price reduced! Old Price $ 100, New Price $ 75\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)\nhttps://developer.apple.com/documentation/swiftui/image/init(decorative:bundle:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.b",
        "issueDescription":  "Data is arranged visually like a data table, but the screen reader does not read the required header cells along with the individual pieces of data content.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by doing ALL of the following:\n1. Implement the information that appears logically as a data table by using standard components, such as UITableView, UICollectionView, UILabel etc.\n2. Ensure that header cell and data cell relationships are correctly conveyed according to the complexity of the table.\n3. Append the accessibilityLabel of a data cell information with column header and row header (if applicable) e.g. \n\nCode: CellInformation.accessibilityLabel = ColumnHeader.text! + \", \" + RowHeader.text! + \", \" + CellInformation.text!\nVoiceOver announcement: “ColumnHeader” “RowHeader” (if applicable) “Data Cell”\n\nHOW TO FIX: SwiftUI:\nFix this issue by doing ALL of the following:\n1. Implement the information that appears logically as a data table using standard components, such as Label for data cell\n2. Ensure that header cell and data cell relationships are correctly conveyed according to the complexity of the table.\n3. Append the accessibilityLabel of a data cell information with column header and row header (if applicable) e.g. \n\nCode: CellInformation.accessibilityLabel = ColumnHeader.text! + \", \" + RowHeader.text! + \", \" + CellInformation.text!\nVoiceOver announcement: “ColumnHeader” “RowHeader” (if applicable) “Data Cell”\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/accessibilitychildbehavior/ignore\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.d",
        "issueDescription":  "NA",
        "recommendation":  "NA for iOS"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.e",
        "issueDescription":  "Text appears and functions like a section heading but is not marked up as such.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityTrait as the header to convey the label as a heading.\n \nheaderLabelObject.accessibilityTraits = .header\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityTrait as the isHeader to convey the label as a heading.\n\nheaderLabelObject\n.accessibilityAddTraits(.isHeader)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits/1620170-header\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isheader\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.e",
        "issueDescription":  "Text that does not serve as a section heading is inappropriately coded as a heading.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by removing the header trait from the label\u0027s accessibilityTrait property.\n\nlabelObject.accessibilityTraits.remove(.header)\n\nHOW TO FIX: SwiftUI:\nFix this issue by removing the header trait from the label\u0027s accessibilityTraits.\n\nlabelObject\n. accessibilityRemoveTraits(.isHeader)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits/1620170-header\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isheader\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityremovetraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.e",
        "issueDescription":  "Heading levels are out of order in such a way that the structure of the content is not properly conveyed",
        "recommendation":  "HOW TO FIX: Swfit: \nFix this issue by restructuring the heading outline to accurately reflect the hierarchical relationships of each section of content.\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityTrait as the isHeader to convey the label as a heading, update accessibilityHeading with the proper heading level.\n\nText(title)\n….\n             .accessibilityAddTraits(.isHeader)\n            .accessibilityHeading(.h1)\n\nText(description)\n….\n             .accessibilityAddTraits(.isHeader)\n            .accessibilityHeading(.h2)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits/1620170-header\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityheading(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.f",
        "issueDescription":  "Content appears like a list but is not marked up as such. \r\n\r\nNote: This checkpoint is applicable only to lists that appear in a WebView content.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue presented in a WebView by using ONE of the following techniques:\n1. Unordered list: Wrap a series of list items (\u003cli\u003e) inside an unordered list element (\u003cul\u003e). Unordered lists should be used when a set of items can be placed in any order.\n\n\u003cul\u003e\n\u003cli\u003eStrawberries\u003c/li\u003e\n\u003cli\u003ePapaya\u003c/li\u003e\n\u003cli\u003eMangos\u003c/li\u003e\n\u003c/ul\u003e\n\n2. Ordered list: Wrap a series of list items (\u003cli\u003e) inside an ordered list element (\u003col\u003e). Ordered lists should be used when the list items need to be placed in a specific order.\n\n\u003ch3\u003eHow to boil an egg\u003c/h3\u003e\n\u003col\u003e\n\u003cli\u003ePlace eggs in a large saucepan.\u003c/li\u003e\n\u003cli\u003eCover them with cool water by 1 inch.\u003c/li\u003e\n\u003cli\u003eCover pan with a lid and bring water to a rolling boil over high heat.\u003c/li\u003e\n\u003cli\u003eWhen the water has reached a boil, remove saucepan from the burner.\u003c/li\u003e\n\u003cli\u003eLet eggs sit in water for 12 minutes.\u003c/li\u003e\n\u003c/ol\u003e\n\n3. When retrofitting legacy markup, using ARIA can be a useful way to add list semantics to markup without the risk of breaking any styles that might be attached to the legacy markup. Wrap the list items in a container that is marked with role=\"list\". Mark each of the list items with role=\"listitem\". NOTE: ARIA can be used to provide equivalent semantics for unordered lists only.\n\n\u003cdiv role=\"list\"\u003e\n\u003cdiv role=\"listitem\"\u003eStrawberries\u003c/div\u003e\n\u003cdiv role=\"listitem\"\u003ePapaya\u003c/div\u003e\n\u003cdiv role=\"listitem\"\u003eMangos\u003c/div\u003e\n\u003c/div\u003e\n\nREFERENCE: \nDeque University: https://dequeuniversity.com/class/semantic-structure2/lists/semantic-markup\nW3C-WAI tutorial: https://www.w3.org/WAI/tutorials/page-structure/content/#lists"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.f",
        "issueDescription":  "Content is not a list but it is marked as such. \r\n\r\nNote: This checkpoint is applicable only to lists that appear in a WebView content.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue presented in a WebView by removing the list markup or adding role=\"none\" to the \u003cul\u003e or \u003col\u003e element.\n\nREFERENCE: \nDeque University: https://dequeuniversity.com/class/semantic-structure2/lists/semantic-markup\nW3C-WAI tutorial: https://www.w3.org/WAI/tutorials/page-structure/content/#lists"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.1.f",
        "issueDescription":  "List or list item is not marked properly.\r\n\r\nNote: This checkpoint is applicable only to lists that appear in a WebView content.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue presented in a WebView by correctly applying \u003cul\u003e/\u003cli\u003e or \u003col\u003e/\u003cli\u003e markup.\n1. Unordered list: Wrap a series of list items (\u003cli\u003e) inside an unordered list element (\u003cul\u003e). Unordered lists should be used when a set of items can be placed in any order.\n\n\u003cul\u003e\n\u003cli\u003eStrawberries\u003c/li\u003e\n\u003cli\u003ePapaya\u003c/li\u003e\n\u003cli\u003eMangos\u003c/li\u003e\n\u003cli\u003eKiwis\u003c/li\u003e\n…\n\u003c/ul\u003e\n\n2. Ordered list: Wrap a series of list items (\u003cli\u003e) inside an ordered list element (\u003col\u003e). Ordered lists should be used when the list items need to be placed in a specific order.\n\n\u003ch3\u003eHow to boil an egg\u003c/h3\u003e\n\u003col\u003e\n\u003cli\u003ePlace eggs in a large saucepan.\u003c/li\u003e\n\u003cli\u003eCover them with cool water by 1 inch.\u003c/li\u003e\n\u003cli\u003eCover pan with a lid and bring water to a rolling boil over high heat.\u003c/li\u003e\n\u003cli\u003eWhen the water has reached a boil, remove saucepan from the burner.\u003c/li\u003e\n\u003cli\u003eLet eggs sit in water for 12 minutes.\u003c/li\u003e\n\u003c/ol\u003e\n\nREFERENCE: \nDeque University: https://dequeuniversity.com/class/semantic-structure2/lists/semantic-markup\nW3C-WAI tutorial: https://www.w3.org/WAI/tutorials/page-structure/content/#lists"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Reading order of static content changes meaning",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the accessibilityElements property on the View to set the logical reading order for the screen reader. Screen readers will read the components in the same order we provided in the array of UI elements for the accessibilityElements property. \n\nviewObject.accessibilityElements = [uiElement1,uiElement2,uiElement3,uiElement4]\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilitySortPriority method on the View to set the logical reading order for the screen reader. Screen readers will read the components in the same order we provided the accessibilitySortPriority index values. Higher numbers are sorted first. The default sort priority is zero. \n\nVStack(alignment:.leading) {\n            HStack(spacing:20) {\n                Text(\"Policy #:\")\n                    .accessibilitySortPriority(6)\n                Text(\"Policy Type:\")\n                    .accessibilitySortPriority(4)\n                Text(\"Address:\")\n                    .accessibilitySortPriority(2)\n            }\n            HStack(spacing:20) {\n                Text(\"AB-782-YZ\")\n                    .accessibilitySortPriority(5)\n                Text(\"boat owner\")\n                    .accessibilitySortPriority(3)\n                Text(\"123 Main Street\")\n                    .accessibilitySortPriority(1)\n            }\n        }\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615147-accessibilityelements\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitysortpriority(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Informative (static) content is not readable by a screen reader.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that all meaningful text content can be accessed programmatically by users of assistive technologies. Hiding redundant or extraneous content from screen readers may be done only if the act of hiding this content is intended to improve the experience for users of assistive technologies and identical or equivalent meaning is provided in another way. Use ONE or BOTH of the following techniques:\n\n1. Use the isAccessibilityElement property to make the static content is accessible by a screen reader.\ncontentObject.isAccessibilityElement = true\n\n2. Use the accessibilityLabel property of the static content component to convey the same information of static content.\ncontentObject.accessibilityLabel = \"informative content goes here\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that all meaningful text content can be accessed programmatically by users of assistive technologies. Hiding redundant or extraneous content from screen readers may be done only if the act of hiding this content is intended to improve the experience for users of assistive technologies and identical or equivalent meaning is provided in another way. \nUse ONE or BOTH of the following techniques:\n\n1. Use the accessibilityHidden method to make the static content accessible by a screen reader.\ncontentObject\n       .accessibilityHidden(false)\n\n2. Use the accessibilityLabel method of the static content component to convey the same information of static content.\ncontentObject\n      .accessibilityLabel(\"informative content goes here\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Informative (static) content is not readable by a screen reader.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the accessibilityLabel property of the static content component to convey the same information of static content.\n\ncontentObject.accessibilityLabel = \"informative content goes here\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityLabel method of the static content component to convey the same information as static content.\n\ncontentObject\n     .accessibilityLabel(\"informative content goes here\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Content that is intended to be hidden from all users is readable with a screen reader.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement property to make content hide for screen readers\n\nhiddenContent.isAccessibilityElement = false\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityHidden method to make content hide for screen readers\n\nhiddenContent\n           .accessibilityHidden(true) \n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Static text displayed and screen reader announcement do not match and the intended meaning of the content is changed.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the accessibilityLabel property to ensure same meaningful visible content is provided for screen reader.\n\ntextObject.accessibilityLabel = \"Same displayed static text\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityLabel method to ensure the same meaningful visible content is provided for the screen reader.\n\ntextObject\n       .accessibilityLabel(\"Same displayed static text\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Screen reader focus is lost or placed on the wrong element during user interaction, content refresh or update, or other reason.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by explicitly placing focus on a logical component when content is removed, refreshed, or added, for example:\n1. For content added to the screen in reaction to a user-fired event, focus should be shifted to the new content.  \n2. For content removed from the screen in reaction to a user-fired event, focus should be shifted to the next logical place in the interaction.\n\nUse the UIAccessibility post notifications layout change to move the screen reader focus:\nUIAccessibility.post(notification: UIAccessibility.Notification.layoutChanged, argument: someargument)\n\nHOW TO FIX: SwiftUI:\nFix this issue by explicitly placing focus on a logical component when content is removed, refreshed, or added, for example:\n1. For content added to the screen in reaction to a user-fired event, focus should be shifted to the new content. \n2. For content removed from the screen in reaction to a user-fired event, focus should be shifted to the next logical place in the interaction.\n\nUse the accessibilityFocused method to the destination view with @AccessibilityFocusState attribute to a property declaration. To move the screen reader focus, enable the focus state\n\n@AccessibilityFocusState\n    private var isFocusdetailsObj : Bool\n……..\nGroup {\n                DescriptionTextView(description: .....)\n                    .accessibilityFocused($isFocusdetailsObj)                \n            }\n            \n            Group {\n                Button(\"Move Focus\") {\n                    isFocusdetailsObj = true\n                }\n}\n……….\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibility/notification/1620186-layoutchanged\nhttps://developer.apple.com/documentation/swiftui/accessibilityfocusstate\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityfocused(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "When the modal dialog is activated, screen reader focus is not placed on/in it.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using ONE of the following techniques:\n1. Use the native component UIAlertController \n2. For custom modal, use the accessibilityViewIsModal property.\n2.1 modalView.accessibilityViewIsModal = true \n2.2 Note: if needed use UIAccessibility.post(notification:UIAccessibility.Notification.layoutchanged, argument: modalFirstObj) \n\nHOW TO FIX: SwiftUI:\nFix this issue using ONE of the following techniques:\n1. Use the native component Alert \n2. For custom modal\n2.1 Use the accessibilityAddTraits method as isModal trait:\nCustomModalViewDesign()\n                     .accessibilityAddTraits(.isModal)\n2.2 Use the accessibilityFocused method with @AccessibilityFocusState during declaration. To move the screen reader focus, enable focusstate:\n\n@AccessibilityFocusState\n    private var isFocusdetailsObj : Bool\n……..\nGroup {\n                DescriptionTextView(description: ...)\n                    .accessibilityFocused($isFocusdetailsObj)                \n            }\n            \n            Group {\n                Button(\"Move Focus\") {\n                    isFocusdetailsObj = true\n                }\n}\n……….\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibility/notification/1620186-layoutchanged\nhttps://developer.apple.com/documentation/swiftui/accessibilityfocusstate\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityfocused(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Screen readers can read content outside the modal dialog.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the modalView Object\u0027s accessibilityViewIsModal property as true.\n\nmodalView.accessibilityViewIsModal = true\n\nHOW TO FIX: SwiftUI:\nFix this issue using the modalView Object\u0027s accessibilityAddTraits method as isModal trait.\n\nCustomModalViewDesign()\n                     .accessibilityAddTraits(.isModal)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615089-accessibilityviewismodal\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/ismodal"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "When the modal dialog or similar element is closed, screen reader focus is not returned to the triggering element.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the UIAccessibility post notifications layout change to move the screen reader focus to the triggering component\n\nUIAccessibility.post(notification:UIAccessibility.Notification.layoutchanged, argument: triggeringComponentObj)\n\nHOW TO FIX: SwiftUI:\nFix this issue using the accessibilityFocused method with @AccessibilityFocusState during declaration. To move the screen reader focus, enable focusstate:\n\n@AccessibilityFocusState\n    private var isFocusdetailsObj : Bool\n……..\nGroup {\n                DescriptionTextView(description: ...)\n                    .accessibilityFocused($isFocusdetailsObj)                \n            }\n            \n            Group {\n                Button(\"Move Focus\") {\n                    isFocusdetailsObj = true\n                }\n}\n……….\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibility/notification/1620186-layoutchanged\nhttps://developer.apple.com/documentation/swiftui/accessibilityfocusstate\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityfocused(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Screen reader focus does not follow visual focus or move to the intended target, such as with a \"return to top\" control.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the UIAccessibility post notifications layout change to move the screen reader focus to the top of the screen.\n\nUIAccessibility.post(notification:UIAccessibility.Notification.layoutChanged, argument: topNavigationObject)\n\nHOW TO FIX: SwiftUI:\nFix this issue using the accessibilityFocused method with @AccessibilityFocusState during declaration. To move the screen reader focus, enable focusstate:\n\n@AccessibilityFocusState\n    private var isFocusdetailsObj : Bool\n……..\nGroup {\n                DescriptionTextView(description: ...)\n                    .accessibilityFocused($isFocusdetailsObj)                \n            }\n            \n            Group {\n                Button(\"Move Focus\") {\n                    isFocusdetailsObj = true\n                }\n}\n……….\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibility/notification/1620186-layoutchanged\nhttps://developer.apple.com/documentation/swiftui/accessibilityfocusstate\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityfocused(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Screen reader focus falls on an interactive element that is hidden or empty.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement property as false to the hidden component.\n\nhiddenObject.isAccessibilityElement = false\n\nOR\n\nHOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement property as true and isHidden property as false to the visible component.\n\nhiddenObject.isAccessibilityElement = true\nhiddenObject.isHidden = false \n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityHidden method to make content hide for screen readers\n\nhiddenContent\n        .accessibilityHidden(true) \n\nOR\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityHidden method to make the visible component.\nhiddenContent\n        .accessibilityHidden(false) \n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "The correct reading order of dynamically changed content is not programmatically determinable by screen readers.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using ONE of the following techniques:\n1. Ensure that added or updated content is, below the element or event that triggered the change.\n2. Thoughtfully manage programmatic focus within the workflow so screen reader users are made aware of new or updated content without disrupting the user\u0027s overall workflow / reading order. This can be done by using the accessibilityElements property on the View to set the reading order for the screen reader is logical. Screen readers will read the components in the same order we provided in the array of UI elements for the accessibilityElements property. \n\nviewObject.accessibilityElements = [uiElement1,uiElement2,uiElement3,uiElement4]\n\nHOW TO FIX: SwiftUI:\nFix this issue by using ONE of the following techniques:\n1. Ensure that added or updated content is, below the element or event that triggered the change.\n2. Thoughtfully manage programmatic focus within the workflow so screen reader users are made aware of new or updated content without disrupting the user\u0027s overall workflow/reading order. \nThis can be done by using the accessibilitySortPriority method on the View to set the reading order for the screen reader as logical. Screen readers will read the components in the same order we provided the accessibilitySortPriority index values. Higher numbers are sorted first. The default sort priority is zero. \n\nVStack {\nHStack {\n…\n.accessibilitySortPriority(6)\n…\n.accessibilitySortPriority(4)\n…\n.accessibilitySortPriority(2)\n}\nHStack {\n…\n.accessibilitySortPriority(5)\n…\n.accessibilitySortPriority(3)\n…\n.accessibilitySortPriority(1)\n}\n}\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615147-accessibilityelements\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitysortpriority(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.3.a",
        "issueDescription":  "Instructions are presented in a way that requires the ability to see shape, color, size, visual location, or orientation.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that instructions that refer to shape, color, size, position, or orientation also reference another non-visual characteristic - such as a text label - that can be accessed using assistive technology - such as a screen reader - and by people who cannot perceive color, shape or size etc."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.3.a",
        "issueDescription":  "Instructions are presented in a way that requires the ability to see shape, color, size, visual location, or orientation.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that instructions that refer to shape, color, size, position, or orientation also reference another non-visual characteristic - such as a text label - that can be accessed using assistive technology - such as a screen reader - and by people who cannot perceive color, shape or size etc."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.3.a",
        "issueDescription":  "Instructions are presented in a way that requires the ability to see shape, color, size, visual location, or orientation.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that instructions that refer to shape, color, size, position, or orientation also reference another non-visual characteristic - such as a text label - that can be accessed using assistive technology - such as a screen reader - and by people who cannot perceive color, shape or size etc."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.3.b",
        "issueDescription":  "Information/instruction is presented in a way that requires the ability to hear sound, and there is no alternate method to convey the information.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that instructions conveyed by audio cues are also available in text so people who are deaf or hard of hearing can still get the information or follow the instructions."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.4.a",
        "issueDescription":  "When the page/app is opened, it is not presented in the device’s current display orientation.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the application does not restrict the screen to a particular display orientation. This can be accomplished by ensuring that Deployment Info options such as Portrait, Landscape Left and Landscape Right are enabled under the Xcode Target \u003e General tab."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.4.a",
        "issueDescription":  "When the device is rotated, the content does not adjust to the new display orientation.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the application does not restrict the screen to a particular display orientation. This can be accomplished by ensuring that Deployment Info options such as Portrait, Landscape Left and Landscape Right are enabled under the Xcode Target \u003e General tab."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.3.4.a",
        "issueDescription":  "The presentation of the content adjusts when the device\u0027s display orientation changes, but some functionality or content is inaccessible.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that all the functionality or content is accessible to a particular display orientation. This can be accomplished by ensuring that Deployment Info options such as Portrait, Landscape Left and Landscape Right are enabled under the Xcode Target \u003e General tab."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.1.a",
        "issueDescription":  "Color is used as the sole method to identify error(s) on form field(s).",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nError identification must not rely on color alone, such as only outlining the field in red or changing the field label to red, to communicate the error.\n\nFix this issue by using ONE or BOTH of the following techniques:\n1. Provide a list of error messages that include the field name at the top of the screen.\n2. Provide an inline form error message that includes the field name or is associated with the field or both."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.1.a",
        "issueDescription":  "Color is used to convey information that is not conveyed in any other way.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by doing ALL of the following:\n1. Provide a visually redundant method of communicating the same information as is conveyed by colors such as real onscreen text, an icon, patterns, or a contrast ratio between components greater than 3.0 to 1.\n2. Provide a screen reader accessible (programmatically-discernable) method of conveying the same information as is conveyed by color such as real onscreen text, screen reader accessible alternative text."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.1.a",
        "issueDescription":  "A change in color is used to visually convey the state of a control, and the contrast difference between the states is less than 3:1.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI:\nFix this issue by adjusting the state indicator (e.g. selected, on etc) color of the user interface component and/or background to increase the contrast to at least 3 to 1."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.1.b",
        "issueDescription":  "Link text and static text are differentiated only by color. The contrast ratio between default link text and surrounding text is not at least 3:1.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using ONE of the following techniques:\n1. Leave the link text and body text in contrast as-is, but add an additional indicator (e.g. underline, outline, etc.) to the link text when it is in its default state.\n2. Increase the contrast between the link text and the body text so that the ratio is at least 3.0 to 1."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.2.a",
        "issueDescription":  "Audio starts playing automatically, lasts more than 3 seconds, and does not have an accessible mechanism to stop, pause, mute or adjust the volume of the audio.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using ONE of the following techniques:\n1. Only start audio with an action initiated by the user (strongly preferred).\n2. Stop the auto-playing audio within 3 seconds.\n3. Provide an easily located, accessible mechanism to stop, pause, mute, or adjust volume for audio that automatically plays for more than 3 seconds."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.3.a",
        "issueDescription":  "The contrast ratio between text and its background is not at least 4.5:1.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the text color and/or background color to increase the contrast to at least 4.5 to 1."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.3.a",
        "issueDescription":  "All or portions of text over an image do not meet the minimum 4.5:1 contrast requirement.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the text and/or background color to increase the contrast to at least 4.5 to 1. Common techniques include:\n1. Applying an opaque or semi-opaque background behind the text.\n2. Lighten or darken part or all of the image to increase the overall contrast between the text and the image.\n3. Use a border around the letters to create sufficient contrast."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.3.a",
        "issueDescription":  "The contrast ratio between placeholder text and its background is not at least 4.5:1.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the placeholder text color and/or background color to increase the contrast to at least 4.5 to 1."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.3.b",
        "issueDescription":  "The contrast ratio between large text and its background is not at least 3:1.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the large text color and/or background color to increase the contrast to at least 3 to 1."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.3.b",
        "issueDescription":  "All or portions of large text over an image do not meet the minimum 3:1 contrast requirement.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the text color and/or background color to increase the contrast to at least 3 to 1. Common techniques include:\n1. Applying an opaque or semi-opaque background behind the text.\n2. Lighten or darken part or all of the image to increase the overall contrast between the text and the image.\n3. Use a border around the letters to create sufficient contrast."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.4.a",
        "issueDescription":  "NOT CURRENTLY APPLICABLE TO NATIVE TESTING:\r\n\r\nFont size does not respond to resizing from Accessibility Settings",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuing:\n1. not to use fixed size fonts e.g. .systemFont(ofSize: 20, weight: .regular). These will not resize based on the user\u0027s accessibility settings.\n2. Use UIFontMetrics to set the fonts and always enable adjustsFontForContentSizeCategory property to update font size as per settings.  \nvisibleLabelObject.adjustsFontForContentSizeCategory = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by not to use fixed size fonts e.g. .font(.system(size: 20)). These will not resize based on the user\u0027s accessibility settings.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uicontentsizecategoryadjusting/1771731-adjustsfontforcontentsizecategor"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.4.a",
        "issueDescription":  "NOT CURRENTLY APPLICABLE TO NATIVE TESTING:\r\n\r\nContent is lost, clipped, or obscured when text is resized to Accessibility setting maximum.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by inherit/add container view to Scrollview to ensure that view controllers are flexible enough to accommodate resizing text up to 200% of it default without clipping, truncating, or obscuring text."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.4.a",
        "issueDescription":  "NOT CURRENTLY APPLICABLE TO NATIVE TESTING:\r\n\r\nFunctionality is lost when text is resized to Accessibility setting maximum.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by inherit/add container view to Scrollview to ensure that when the screen is zoomed to 200% functionality is not hidden or obscured by the resizing of text containers or other content, and that no functionality is removed from the screen."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.5.a",
        "issueDescription":  "The image contains embedded text.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using the real text to achieve the desired visual design."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.11.a",
        "issueDescription":  "The visual boundary of an active user interface component lacks 3 to 1 contrast ratio.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the user interface component boundary and/or background to increase the contrast with either the inner or outer adjacent background to at least 3 to 1."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.11.b",
        "issueDescription":  "The state of an active component lacks 3 to 1 contrast ratio.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the state indicator (e.g. selected, on etc) color of the user interface component and/or background to increase the contrast to at least 3 to 1."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.11.b",
        "issueDescription":  "Focus indicator lacks 3 to 1 contrast ratio.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the visual focus indicator to achieve 3 to 1 contrast according the scenarios below.\n\nWhen a focus indicator appears:\n\n1. Outside the component, it needs to contrast with the background that the component is on.\n2. Inside the component, it needs to contrast with the adjacent color(s) within the component.\n3. As the border of the component (inside the component and adjacent to the outside), it needs to contrast with both adjacent colors.\n4. Appears partly inside and partly outside, either part of the focus indicator can contrast with the adjacent colors.\n\nREFERENCE:\nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615159-accessibilitypath"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.11.c",
        "issueDescription":  "Parts of graphics (required to understand the content) do not have a contrast ratio of 3 to 1 against adjacent color(s).",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the graphical component color and/or background color to increase the contrast to at least 3 to 1."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "1.4.11.c",
        "issueDescription":  "Parts of an icon (with no text) do not have a contrast ratio of 3 to 1 against adjacent color(s). These icon parts are required for understanding.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by adjusting the icon color and/or background color to increase the contrast to at least 3 to 1."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed with a screen reader turned on.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using ONE of the following techniques:\n1. Make sure the interactive component is enabled.\nNote: If the component is not focusable by the screen reader, enable isAccessibilityElement property.\n\nbuttonUnSubscribe.isEnabled = true\nbuttonUnSubscribe.isAccessibilityElement = true \n\n2. For any gesture-based interactions, use the UIAccessibilityCustomAction API to add  gesture-based actions as custom actions for interactive controls\n  \n        //for our best practice we are adding custom actions to UILabel, UIImageView\n        //For UILabel\n        lblofcustomAction.isUserInteractionEnabled = true //enable user interaction\n        let customAction = UIAccessibilityCustomAction.init(name: \"Tap to Sound\", target: self, selector: #selector(makeSound))\n        lblofcustomAction.accessibilityCustomActions = [customAction] //add accessibility custom action\n        lblofcustomAction.accessibilityLabel = \"Tap to Sound\" //add accessibility label\n        lblofcustomAction.accessibilityTraits = .button //add accessibility trait\n\nHOW TO FIX: SwiftUI:\nFix this issue by using ONE of the following techniques:\n1. Make sure the interactive component is enabled.\nNote: If the component is not focusable by the screen reader then disable the accessibilityHidden method.\n \nbuttonUnSubscribe\n. accessibilityHidden(false) \n\n2. For any gesture-based interactions, use the accessibilityAction method to add gesture-based actions as custom actions for interactive controls\n \nButton(action: {\n                }, label: {\n                    Text(\"Tap to Sound\")\n                })\n                .accessibilityAction(named: Text(\"Swipe actions\"), {\n                })\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uicontrol/1618217-isenabled\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitycustomaction/\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaction(named:_:)-6t20v\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed with a screen reader turned on.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement property to make the interactive component available for VoiceOver. Make sure the interactive component is enabled, by applying isEnabled to true for the component.\n\ninteractiveObject.isEnabled = true\ninteractiveObject.isAccessibilityElement = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityHidden method to make the interactive component available for VoiceOver. \n\ninteractiveObject \n       .accessibilityHidden(false) \n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed using Voice Control.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement property to make the interactive component available for Voice Control. Make sure the interactive component is enabled, by applying isEnabled to true for the component.\n\ninteractiveObject.isEnabled = true\ninteractiveObject.isAccessibilityElement = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityHidden method to make the interactive component available for VoiceOver. \n\ninteractiveObject \n       .accessibilityHidden(false) \n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed using Voice Control. [USER AGENT ISSUE]",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement property to make the interactive component available for Voice Control. Make sure the interactive component is enabled, by applying isEnabled to true for the component.\n\ninteractiveObject.isEnabled = true\ninteractiveObject.isAccessibilityElement = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityHidden method to make the interactive component available for VoiceOver. \n\ninteractiveObject \n       .accessibilityHidden(false) \n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed using switch control.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement property to make the interactive component available for voice control\nMake sure the interactive component is enabled, and update isEnabled as true for the component.\n\nmyButton.isEnabled = true\nmyButton.isAccessibilityElement = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityHidden method to make the interactive component available for VoiceOver. \n\ninteractiveObject \n       .accessibilityHidden(false) \n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.1.c",
        "issueDescription":  "Custom gesture is not accessible when the screen reader is turned on.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that there are alternative methods to perform all gesture-based actions, for example: previous and next arrow buttons or custom actions to advance a carousel in addition to swiping left and right. Use the UIAccessibilityCustomAction API to add custom actions for interactive controls\n\n  let accCustomAc = UIAccessibilityCustomAction.init(name: \"Lock\", target: self, selector: #selector(successAlert))\n        interactiveObject.accessibilityCustomActions = [accCustomAc]\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that there are alternative methods to perform all gesture-based actions, for example: previous and next arrow buttons or custom actions to advance a carousel in addition to swiping left and right. Use the accessibilityAction method to add custom actions for interactive controls\n              \ninteractiveObject\n  .accessibilityAction(named: Text(\"Lock \"), {\n                    ….\n                })\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/tutorials/app-dev-training/examining-accessibility-in-today/\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaction(named:_:)-6t20v"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.2.a",
        "issueDescription":  "Switch control focus is trapped in a control.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by understanding where the switch control focus trap is occurring and using a technique such as:\n1. Make sure the way to navigate through a particular section of the screen (usually switch control navigation) can move past that section.\n2. Make sure the UI content following the above section, is exposed via accessibility services are implemented, using isEnabled property true.\n\nmyUIControl.isEnabled = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by understanding where the switch control focus trap is occurring and using a technique such as:\n1. Make sure the way to navigate through a particular section of the screen (usually switch control navigation) can move past that section.\n2. Make sure the UI content following the above section, is exposed via accessibility services are implemented, using the disabled method as false.\n\nmyUIControl.disabled(false)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uicontrol/1618217-isenabled\nhttps://developer.apple.com/documentation/swiftui/view/disabled(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.2.a",
        "issueDescription":  "The dialog cannot be dismissed using Switch Control",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by doing at least ONE of the following:\n\n1.        Ensure by implementing the standard Alert control with interactive actions.\n2.        For custom alert control or other custom modal views, use the accessibilityViewIsModal property to implement accessible switch control \n\nmodalView.accessibilityViewIsModal = true\n\nNote: If needed use isEnabled property, isAccessibilityElement property and post notification\nmodalViewInteraction.isEnabled = true\nmodalViewInteraction.isAccessibilityElement = true\nUIAccessibility.post(notification:UIAccessibility.Notification.layoutchanged, argument: modalFirstObj)\n\nHOW TO FIX: SwiftUI:\nFix this issue using ONE of the following techniques:\n1. Ensure by implementing the standard Alert control with interactive actions.\n2. For custom modal: \n2.1 use the accessibilityAddTraits method as isModal trait:\nCustomModalViewDesign()\n.accessibilityAddTraits(.isModal)\n\n2.2 Use the accessibilityFocused method with @AccessibilityFocusState during declaration. To move the screen reader focus, enable focusstate:\n@AccessibilityFocusState\nprivate var isFocusdetailsObj : Bool\n……..\nGroup {\nDescriptionTextView(description: ...)\n.accessibilityFocused($isFocusdetailsObj) \n}\n\nGroup {\nButton(\"Move Focus\") {\nisFocusdetailsObj = true\n}\n}\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibility/notification/1620186-layoutchanged\nhttps://developer.apple.com/documentation/swiftui/accessibilityfocusstate\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityfocused(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.2.a",
        "issueDescription":  "Screen reader focus is trapped in an element",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by understanding where VoiceOver focus trap is occurring and using a technique such as:\n1. Make sure the way to navigate through a particular section of the screen (usually VoiceOver navigation) can move past that section.\n2. Make sure the UI content following the above section, is exposed via accessibility services are implemented using isEnabled property true.\n\nmyUIControl.isEnabled = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by understanding where the VoiceOver focus trap is occurring and using a technique such as:\n1. Make sure the way to navigate through a particular section of the screen (usually VoiceOver navigation) can move past that section.\n2. Make sure the UI content following the above section, is exposed via accessibility services are implemented, using the disabled method as false.\n\nmyUIControl.disabled(false)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uicontrol/1618217-isenabled\nhttps://developer.apple.com/documentation/swiftui/view/disabled(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.1.2.a",
        "issueDescription":  "The dialog cannot be dismissed when the screen reader is turned on",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by understanding where VoiceOver focus trap is occurring and using a technique such as:\n1. Make sure the way to navigate through a particular section of the screen (usually screen reader navigation) can move past that section.\n2. Make sure the UI content following the above section, is exposed via accessibility services are implemented using isEnabled property true.\n\nmyUIControl.isEnabled = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by understanding where the VoiceOver focus trap is occurring and using a technique such as:\n1. Make sure the way to navigate through a particular section of the screen (usually VoiceOver navigation) can move past that section.\n2. Make sure the UI content following the above section, is exposed via accessibility services are implemented, using the disabled method as false.\n\nmyUIControl.disabled(false)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uicontrol/1618217-isenabled\nhttps://developer.apple.com/documentation/swiftui/view/disabled(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.1.a",
        "issueDescription":  "Content visually appears for a short time and then disappears. The user has no way to adjust when the content visually appears or disappears. Examples of content include error messages, success messages, and updating headlines.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by doing ONE of the following:\n1. Leave the content on the screen until dismissed by the user.\n2. Allow the user to adjust the amount of time temporary content is displayed on the screen, up to 10 times the default."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.1.a",
        "issueDescription":  "Content times out without providing any warning to the user.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by providing an accessible warning of the timeout and an accessible mechanism to do ONE of the following:\n1. Turn off: Allow the user to turn off the time limit before encountering it.\n2. Adjust: Allow the user to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting.\n3. Extend: Warn the user before time expires, give the user at least 20 seconds to extend the time limit with a simple action (for example, \"press the button\"), and allow the user to extend the time limit at least ten times.\n\n* For example - code snippet for alert representation\n\nlet alertview = UIAlertController(title: \"Timeout \", message: \"Session Timeout. Logout or try again\", preferredStyle: .alert)\nlet alertaction = UIAlertAction(title: \"Okay\", style: .default) { (actionObj) in\n...\n}\nalertview.addAction(alertaction)\nalertview.view.accessibilityValue = \"\\(String(describing: alertview.title!)) + \\(String(describing: alertview.message!))\" //its mandatory to add accessible label\nself.present(alertview, animated: true, completion: nil)\n\nRepresent any notification or warning actions to the user to increase or disable the timer.\n\n* We can also use Toast messages with a user action to dismiss.\n\nHOW TO FIX: SwiftUI:\nFix this issue by providing an accessible warning of the timeout and an accessible mechanism to do ONE of the following:\n1. Turn off: Allow the user to turn off the time limit before encountering it.\n2. Adjust: Allow the user to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting.\n3. Extend: Warn the user before time expires, give the user at least 20 seconds to extend the time limit with a simple action (for example, \"press the button\"), and allow the user to extend the time limit at least ten times.\n\n* For example - code snippet for alert representation\n\nButton(action: { self.showAlert = true }) {\nText(\"Show alert\")\n}\n.alert(\"Time out\", isPresented: $showAlert, actions: {\n                        Button(\"Okay\", role: .destructive) {                           \n                        }\n                    }, message: {\n                        Text(\"Session Timeout. Logout or try again\")\n                    })\nRepresent any notification or warning actions to the user to increase or disable the timer.\n\n* We can also use Toast messages with a user action to dismiss.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uialertcontroller\nhttps://developer.apple.com/documentation/swiftui/view/alert(_:ispresented:presenting:actions:message:)-8584l"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.1.a",
        "issueDescription":  "The timeout warning does not provide a way to turn off the time limit or to adjust or extend the limit at least 10 times.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by providing an accessible warning of the timeout and an accessible mechanism to do ONE of the following:\n1. Turn off: Allow the user to turn off the time limit before encountering it.\n2. Adjust: Allow the user to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting.\n3. Extend: Warn the user before time expires, give the user at least 20 seconds to extend the time limit with a simple action (for example, \"activate a button\"), and allow the user to extend the time limit at least ten times.\n\n* For example - code snippet for alert representation\n\nlet alertview = UIAlertController(title: \"Timeout \", message: \"Session will timeout in 30 seconds, want to Extend?\", preferredStyle: .alert)\nlet alertaction = UIAlertAction(title: \"Okay\", style: .default) { (actionObj) in\nprint(\"alert action is clicked\")\n}\nlet alertactionExtend = UIAlertAction(title: \"Extend\", style: .default) { (actionObj) in\nprint(\"alert Extend action is clicked\")\n}\nalertview.addAction(alertaction)\nalertview.addAction(alertactionExtend)\n//we can add stop action as per requirement \nalertview.view.accessibilityValue = \"\\(String(describing: alertview.title!)) + \\(String(describing: alertview.message!))\" //its mandatory to add accessible label\nself.present(alertview, animated: true, completion: nil)\n\nHOW TO FIX: SwiftUI:\nFix this issue by providing an accessible warning of the timeout and an accessible mechanism to do ONE of the following:\n1. Turn off: Allow the user to turn off the time limit before encountering it.\n2. Adjust: Allow the user to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting.\n3. Extend: Warn the user before time expires, give the user at least 20 seconds to extend the time limit with a simple action (for example, \"press the button\"), and allow the user to extend the time limit at least ten times.\n\n* For example - code snippet for alert representation\n\nButton(action: { self.showAlert = true }) {\nText(\"Show alert\")\n}\n.alert(\"Time out\", isPresented: $showAlert, actions: {\n                        Button(\"Okay\", role: .destructive) { \n                        }\n                    }, message: {\n                        Text(\"Session Timeout. Logout or try again\")\n                    })\nRepresent any notification or warning actions to the user to increase or disable the timer.\n\n* We can also use Toast messages with a user action to dismiss.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uialertcontroller\nhttps://developer.apple.com/documentation/swiftui/view/alert(_:ispresented:presenting:actions:message:)-8584l"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.1.a",
        "issueDescription":  "Screen reader users are not made aware of the presence of the time out warning.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the UIAccessibility post notifications announcement so the screen reader can announce timeout warning messages \nUIAccessibility.post(notification: UIAccessibility.Notification.announcement, argument: \"Timeout warning message\")\n\nHOW TO FIX: SwiftUI:\nFix this issue by using ONE of the following techniques:\n1. Use the UIAccessibility post notifications announcement so the screen reader can announce timeout warning messages. Implement this in the ViewModel and call that function in the SwiftUI actionable block.\nUIAccessibility.post(notification: UIAccessibility.Notification.announcement, argument: \"Timeout warning message\")\n2. Use the Accessibility Notification.\nAccessibilityNotification.Announcement(AttributedString(\"Timeout warning message\")).post()\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615089-accessibilityviewismodal\nhttps://developer.apple.com/documentation/uikit/uiaccessibility/notification/1620186-layoutchanged\nhttps://developer.apple.com/documentation/accessibility/accessibilitynotification/announcement"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.1.a",
        "issueDescription":  "The mechanism to extend the session is not accessible by a screen reader.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring the time extension option is screen reader accessible.\n\n self.isAccessibilityElement = true\n self.accessibilityLabel = \"Extend\"\n self.accessibilityTraits = .button\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring the time extension option is screen reader accessible.\n\ninteractiveObject \n      .accessibilityHidden(false)\n      .accessibilityLabel(\"Extend\")\n      .accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/uikit/uiaccessibility/notification/1620186-layoutchanged\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.1.a",
        "issueDescription":  "The mechanism to extend the session is not accessible by Switch Control.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring the time extension option is switch control accessible.\n\n self.isAccessibilityElement = true\n self.accessibilityLabel = \"Extend\"\n self.accessibilityTraits = .button\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring the time extension option is screen reader accessible.\n\ninteractiveObject \n      .accessibilityHidden(false)\n      .accessibilityLabel(\"Extend\")\n      .accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/uikit/uiaccessibility/notification/1620186-layoutchanged\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.2.a",
        "issueDescription":  "Auto-playing media or animation has no mechanism to pause, stop, or hide the content.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing an accessible mechanism to pause the auto-updating content or to change the frequency with which content is updated."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.2.a",
        "issueDescription":  "Moving or blinking content that lasts more than 5 seconds does not have a mechanism to pause, stop or hide it.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing an accessible mechanism to pause, stop, or hide the blinking or moving content."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.2.b",
        "issueDescription":  "Automatically updating content does not have a mechanism to pause, stop, hide, or control the timing of the updates.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing an accessible mechanism to pause or hide the auto-updating content or to control the frequency with which content is updated."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.2.2.b",
        "issueDescription":  "The carousel does not have a mechanism to pause, stop, or control the changing content.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing an accessible mechanism to pause and resume carousel slides or to change the frequency with which the slides change."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.3.1.a",
        "issueDescription":  "Content flashes more than 3 times per second and exceeds 25% of 10 degrees of visual field in area.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using ONE of the following techniques:\n1. Ensure that no content on the screen flashes more than 3 times per second.\n2. Ensure that content that flashes more than 3 times per second is sufficiently small: smaller than a contiguous area of 21,824 sq pixels (any shape).\n3. Ensure that content that flashes more than 3 times per second has a low enough contrast."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.4.2.a",
        "issueDescription":  "There is no screen title or main heading at the beginning of the screen to identify the purpose of the screen.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by doing ONE OR MORE of the following:\n1. Use the default navigation bar if possible. Screen readers will recognize the title automatically and announce it as a heading.\n2. If you use custom view as the navigation bar, use the accessibilityTrait property to make the title label as a heading.\n\ntitleLabelObject.accessibilityTrait = .header\n\nHOW TO FIX: SwiftUI:\nFix this issue by doing ONE OR MORE of the following:\n1. Use the default navigation view with the navigation title property. Screen readers will recognize the title automatically and announce it as a heading.\n2. If you use custom view as the navigation bar, use the accessibilityTrait property to make the title label as a heading.\n\ntitleLabelObject.accessibilityAddTraits(.isHeader)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits/1620170-header\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isheader\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isheader"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.4.2.a",
        "issueDescription":  "The screen title or main heading does not identify the purpose of the screen.",
        "recommendation":  "HOW TO FIX: Swift:\nFix the issue by making the screen title meaningful and explaining its purpose to users.\n\ntitleLabelObject.text = \"Meaningful and descriptive screen title\"\n\nHOW TO FIX: SwiftUI:\nFix the issue by making the screen title meaningful and explaining its purpose to users.\n\nText (“Meaningful and descriptive screen title”)\n.accessibilityAddTraits(.isHeader)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits/1620170-header\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isheader\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isheader"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.4.3.a",
        "issueDescription":  "Note: iOS Switch Control Testing (optional)\r\n\r\nSwitch Control focus falls on an element that is hidden or empty.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using ONE of the following techniques:\n1.If the control should not be visible or focusable, remove it for all users using technique such as  hiddenContent.isAccessibilityElement = false.\n2.If the control is meant to be visible but not interactive, make it visible and update the necessary trait such as mycontrol.accessibilityTraits = UIAccessibilityTraits.staticText.\n3.If the control is meant to be visible and interactive, then ensure that it is both focusable and visible to all users using technique such as  hiddenContent.isAccessibilityElement = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by using ONE of the following techniques:\n1. If the control is not visible or focusable, remove it for all users using accessibilityHidden method.\nText(\"…...\")\n                .accessibilityHidden(true)\n2. If the control is meant to be visible but not interactive, make it visible and update the necessary trait such as                     \nText(\"…...\")\n            .accessibilityAddTraits(.isStaticText)\n3. If the control is meant to be visible and interactive, then ensure that it is both focusable and visible to all users using techniques such as\n Content \n               .accessibilityHidden(false)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.4.6.a",
        "issueDescription":  "The heading does not describe the topic or purpose of the content that follows it.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by providing headings that are clear, informative, and descriptive of the content that follows.\n\nheaderLabelObject.accessibilityLabel = \" Describe the header\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by providing headings that are clear, informative, and descriptive of the content that follows.\n\nheaderLabelObject\n.accessibilityLabel(\" Describe the header\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.4.6.b",
        "issueDescription":  "The label does not convey the purpose of the control.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by providing a descriptive label for the control. Use the accessibilityLabel property to define the interactive component label that describes the action of the control.\n\nbuttonObject.accessibilityLabel = \" Details of element action \"\n\nHOW TO FIX: SwiftUI:\nFix this issue by providing a descriptive label for the control. Use the accessibilityLabel method to define the interactive component label that describes the action of the control.\n\nbuttonObject\n.accessibilityLabel(\" Details of element action \")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.4.6.b",
        "issueDescription":  "Multiple controls have the same labels/names but perform different actions. This is not conveyed via text associated with individual controls.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using ONE of the following techniques:\n1. Use the accessibilityLabel property to provide a complete programmatic label for the button.\n\n //set accessibilityLabel\n btnofSubscribe.accessibilityLabel = \"Class A: House training your puppy\"\n\n2. For more than one interactive component performing the same function, use the accessibilityLabel attribute to associate visible text with the button to provide a complete description of the button\u0027s purpose.\n\n//set accessibilityLabel\nbtnofSubscribe.accessibilityLabel = \"Register for Class A: House training your puppy\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by using ONE of the following techniques:\n1. Use the accessibilityLabel method to provide a complete programmatic label for the button.\n\n//set accessibilityLabel\nbtnofSubscribe\n.accessibilityLabel(\"Class A: House training your puppy\")\n\n2. For more than one interactive component performing the same function, use the accessibilityLabel method to associate visible text with the button to provide a complete description of the button\u0027s purpose.\n\n//set accessibilityLabel\nbtnofSubscribe\n.accessibilityLabel(\"Register for Class A: House training your puppy\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.4.6.b",
        "issueDescription":  "The programmatic label does not convey the purpose of the control. The programmatic label and visual label do not convey consistent information.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the programmatic label for the control correctly conveys the purpose of the control. Generally, the programmatic label and the visual label should match. Use the accessibilityLabel property to update the purpose of the control.\n\nbuttonObject.accessibilityLabel = \" match the visible label value \"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the programmatic label for the control correctly conveys the purpose of the control. Generally, the programmatic label and the visual label should match. Use the accessibilityLabel method to update the purpose of the control.\n\nbuttonObject\n.accessibilityLabel(\" match the visible label value \")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.4.6.b",
        "issueDescription":  "The visible label does not convey the purpose of the control. The programmatic label and visual label do not convey consistent information.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the visual label for the control correctly conveys the purpose of the control. Generally, the programmatic label and the visual label should match. Use the accessibilityLabel property to update the purpose of the control.\n\nbuttonObject.accessibilityLabel = \" match the visible label value \"\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the visual label for the control correctly conveys the purpose of the control. Generally, the programmatic label and the visual label should match. Use the accessibilityLabel method to update the purpose of the control.\n\nbuttonObject\n.accessibilityLabel(\" match the visible label value \")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.1.a",
        "issueDescription":  "Functionality (excluding operating system, user agent or assistive technology functions) requires multipoint gestures.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by providing an alternative method to accomplish the same function that relies only on single-pointer actions that are not path-based. The alternative method can replace the current method or be an additional method. Examples of single-pointer activation on a touchscreen or touchpad include taps, double taps, long presses, dragging actions and custom actions that are not path-based. \nUse the UIAccessibilityCustomAction API to add custom actions for interactive controls, and make sure the view is interactive for the screen reader using isUserInteractionEnabled property.\n\n//add custom actions to UIView\nviewObject.isUserInteractionEnabled = true //enable user interaction\nlet viewObject = UIAccessibilityCustomAction.init(name: \"SinglePointGestureAction\", target: self, selector: #selector(makeSound))\nviewObject.accessibilityCustomActions = [customAction] //add accessibility custom action\nviewObject.accessibilityLabel = \"Perform Gesture\" //add accessibility label\n\nHOW TO FIX: SwiftUI:\nFix this issue by providing an alternative method to accomplish the same function that relies only on single-pointer actions that are not path-based. The alternative method can replace the current method or be an additional method. Examples of single-pointer activation on a touchscreen or touchpad include taps, double taps, long presses, dragging actions and custom actions that are not path-based. \nUse the accessibilityAction method to add custom actions for interactive controls, and make sure the view is interactive for the screen reader.\n\n//add custom actions to View\nviewObject \n.accessibilityAction(named: Text(\"SinglePointGestureAction\"), {\n                ....\n            })\n            .accessibilityAddTraits(.isButton)\n            .accessibilityLabel(\"Perform Gesture\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiview/1622577-isuserinteractionenabled\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitycustomaction/\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaction(named:_:)-6t20v"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.1.a",
        "issueDescription":  "Functionality (excluding operating system, user agent or assistive technology functions) relies on path-based gestures.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by providing an alternative method to accomplish the same function that does not rely only on path-based pointer actions. The alternative method can replace the current method or be an additional method. Examples of path-based gestures include swiping, sliders and carousels dependent on the direction of interaction, and other gestures which trace a prescribed path such as drawing a specific shape. Such paths may be drawn with a finger or stylus on a touchscreen, graphics tablet, or trackpad, or with a mouse, joystick, or similar pointer device. The alternative method can replace the current method or be an additional method. \nUse the UIAccessibilityCustomAction API to add custom actions for multipoint gestures to perform the same functionality, and make sure the view is interactive for the screen reader using the isUserInteractionEnabled property.\n\n//for our best practice we are adding custom actions to UIView\nviewObject.isUserInteractionEnabled = true //enable user interaction\nlet viewObject = UIAccessibilityCustomAction.init(name: \"MultipointGesture\", target: self, selector: #selector(makeSound))\nviewObject.accessibilityCustomActions = [customAction] //add accessibility custom action\nviewObject.accessibilityLabel = \"Perform Gesture\" //add accessibility label\n\nHOW TO FIX: SwiftUI:\nFix this issue by providing an alternative method to accomplish the same function that does not rely only on path-based pointer actions. The alternative method can replace the current method or be an additional method. Examples of path-based gestures include swiping, sliders and carousels dependent on the direction of interaction, and other gestures which trace a prescribed path such as drawing a specific shape. Such paths may be drawn with a finger or stylus on a touchscreen, graphics tablet, or trackpad, or with a mouse, joystick, or similar pointer device. The alternative method can replace the current method or be an additional method. \nUse the accessibilityAction method to add custom actions for multipoint gestures to perform the same functionality, and make sure the view is interactive for the screen reader.\n\n//add custom actions to View\nviewObject \n.accessibilityAction(named: Text(\"SinglePointGestureAction\"), {\n                ....\n            })\n            .accessibilityAddTraits(.isButton)\n            .accessibilityLabel(\"Perform Gesture\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiview/1622577-isuserinteractionenabled\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitycustomaction/\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaction(named:_:)-6t20v"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.2.a",
        "issueDescription":  "Control submits an irreversible action on the down event.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using ONE of the following techniques:\n\n1. Use native interactive controls, such as buttons.\n\n2. Use a generic touch-up event.\n\n3. Provide an opportunity for the user to confirm or abort the action before completing it.\n\n4. Provide a mechanism to undo the action after it is completed."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.3.a",
        "issueDescription":  "Accessible name contains the visible label text, but one or more other words is interspersed in the label",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessible name - such as the accessibilityLabel - contains the text of the visible label in the same order in which it appears and without words interspersed. While it is not necessary that the visible label and accessible name match exactly, it is a best practice to have the accessible name begin with the visible text.\n\nbutton.accessibilityLabel = \"visible label + additional description\" \n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessible name - such as the accessibilityLabel - contains the text of the visible label in the same order in which it appears and without words interspersed. While it is not necessary that the visible label and accessible name match exactly, it is a best practice to have the accessible name begin with the visible text.\n\nbutton\n.accessibilityLabel(\"Visible Label\" + \" Description\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.3.a",
        "issueDescription":  "Accessible name does not contain the visible label text.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessible name - such as the accessibilityLabel - contains the text of the visible label in the same order in which it appears and without words interspersed. While it is not necessary that the visible label and accessible name match exactly, it is a best practice to have the accessible name begin with the visible text.\n\nbutton.accessibilityLabel = \"visible label + additional description\" \n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessible name - such as the accessibilityLabel - contains the text of the visible label in the same order in which it appears and without words interspersed. While it is not necessary that the visible label and accessible name match exactly, it is a best practice to have the accessible name begin with the visible text.\n\nbutton\n.accessibilityLabel(\"Visible Label\" + \" Description\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.3.a",
        "issueDescription":  "Accessible name contains the visible label text, but the words of the visible label are not in the same order as they are in the accessible name.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the accessible name - such as the accessibilityLabel - contains the text of the visible label in the same order in which it appears and without words interspersed. While it is not necessary that the visible label and accessible name match exactly, it is a best practice to have the accessible name begin with the visible text.\n\nbutton.accessibilityLabel = \"visible label + additional description\" \n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the accessible name - such as the accessibilityLabel - contains the text of the visible label in the same order in which it appears and without words interspersed. While it is not necessary that the visible label and accessible name match exactly, it is a best practice to have the accessible name begin with the visible text.\n\nbutton\n.accessibilityLabel(\"Visible Label\" + \" Description\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.3.a",
        "issueDescription":  "The visible label is not in the accessible name because the label is not associated with the control.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by implementing an associated visible label as the accessibilityLabel for the Text Field or Text View. \n\nformFieldObject.accessibilityLabel = \"Form Field Visible Label\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by implementing an associated visible label as the accessibilityLabel method for the Text Field or Text View. \n\nformFieldObject\n   .accessibilityLabel(\"Form Field Visible Label\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.4.a",
        "issueDescription":  "Motion actuation cannot be disabled.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing a mechanism, such as an application setting, that turns off motion-actuated features."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.4.a",
        "issueDescription":  "Motion actuation disrupts or disables system level features.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the application does not disrupt or disable system-level features which allow the user to disable motion actuation."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.4.a",
        "issueDescription":  "Functionality can only be activated via motion actuation  (such as shaking or tilting the device).",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that alternative means of input exist when using device motion sensor input to activate content functionality.\nUse the UIAccessibilityCustomAction API to add custom actions for interactive controls, and make sure the view is interactive for the screen reader using the isUserInteractionEnabled property.\n\n//custom actions to UIView\n        viewObject.isUserInteractionEnabled = true //enable user interaction\n        let viewObject = UIAccessibilityCustomAction.init(name: \"shaking gesture\", target: self, selector: #selector(makeSound))\n        viewObject.accessibilityCustomActions = [customAction] //add accessibility custom action\n        viewObject.accessibilityLabel = \"Undo\" //add accessibility label\n\nHOW TO FIX: SwiftUI:\nFix this issue by providing an alternative method to accomplish the same function that does not rely only on path-based pointer actions. The alternative method can replace the current method or be an additional method. Examples of path-based gestures include swiping, sliders and carousels dependent on the direction of interaction, and other gestures which trace a prescribed path such as drawing a specific shape. Such paths may be drawn with a finger or stylus on a touchscreen, graphics tablet, or trackpad, or with a mouse, joystick, or similar pointer device. The alternative method can replace the current method or be an additional method. \nUse the accessibilityAction method to add custom actions for multipoint gestures to perform the same functionality, and make sure the view is interactive for the screen reader.\n\n//add custom actions to View\nviewObject \n.accessibilityAction(named: Text(\"SinglePointGestureAction\"), {\n                ....\n            })\n            .accessibilityAddTraits(.isButton)\n            .accessibilityLabel(\"Perform Gesture\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiview/1622577-isuserinteractionenabled\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitycustomaction/\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaction(named:_:)-6t20v"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.7.a",
        "issueDescription":  "Functionality requires a dragging movement and does not have a single-pointer, single-touch alternative.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI: \nFix this issue by providing an alternative method to accomplish the same function that can be accomplished using single taps such as alternative input into a text field, or a tap to select and a tap to drop.\n\nThe alternative method can replace the current method or be an additional method.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.7.a",
        "issueDescription":  "Functionality requires a dragging movement and does not have a single-pointer, single-touch alternative.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI: \nFix this issue by providing an alternative method to accomplish the same function that can be accomplished using single taps such as alternative input into a text field, or a tap to select and a tap to drop.\n\nThe alternative method can replace the current method or be an additional method.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "2.5.8.a",
        "issueDescription":  "Target does not meet minimum 24 x 24 pt size or spacing.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI: \nFix this issue by doing at least ONE of the following:\n1. Ensure that the control has a target size of at least 24 x 24 pt.\n2. Ensure that a 24 pt diameter circle centered on the target does not touch another target nor a 24 pt diameter circle placed on the center of any other adjacent targets that are less than 24 by 24 pt\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.1.2.a",
        "issueDescription":  "The change in language for a portion of content is not correct.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by applying the lang property to the attributed string that has a different language than the primary language of the screen. \n\nastrMessage.addAttribute(\"Hello Hola\".Key.accessibilitySpeechLanguage, value: \"es\", range: NSRange(location: 7, length: 4))\n\nHOW TO FIX: SwiftUI:\nFix this issue by creating localizable strings in the string catalog for each language and use NSLocalizedString function for the given key.\n\nimport UIKit\n\nlet helloRange = (text as NSString).range(of: \"Hello\")\nlet holaRange = (text as NSString).range(of: \"Hola\")\nattributedString.addAttribute(.accessibilitySpeechLanguage, value: \"es\", range: holaRange)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.1.2.a",
        "issueDescription":  "The change in language for a portion of content is not coded.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by applying the lang property to the attributed string that has a different language than the primary language of the screen. \n\nastrMessage.addAttribute(\"Hello Hola\".Key.accessibilitySpeechLanguage, value: \"es\", range: NSRange(location: 7, length: 4))\n\nHOW TO FIX: SwiftUI:\nFix this issue by creating localizable strings in the string catalog for each language and use NSLocalizedString function for the given key.\n\nimport UIKit\n\nlet helloRange = (text as NSString).range(of: \"Hello\")\nlet holaRange = (text as NSString).range(of: \"Hola\")\nattributedString.addAttribute(.accessibilitySpeechLanguage, value: \"es\", range: holaRange)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.2.1.a",
        "issueDescription":  "When screen reader focus falls on a component, focus is automatically removed or redirected.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI::\nFix this issue by ensuring that focus is not moved to another component or removed altogether when a component receives screen reader focus."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.2.1.a",
        "issueDescription":  "When switch control focus falls on a component, focus is automatically removed or redirected.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI::\nFix this issue by ensuring that focus is not moved to another component or removed altogether when a component receives screen reader focus."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.2.1.a",
        "issueDescription":  "When a component receives screen reader focus there is a significant change of content in the page (above the user\u0027s point of regard) that changes the meaning of the page.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI:\nFix this issue by ensuring that when a screen component receives focus, it does not result in a change in context including:\n1) submitting a form automatically;\n2) launching a new screen;\n3) changing focus to another component when a component receives focus; or\n4) any other change that could confuse or disorient the user."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.2.1.a",
        "issueDescription":  "When a component receives switch control focus there is a significant change of content in the page (above the user\u0027s point of regard) that changes the meaning of the page.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI:\nFix this issue by ensuring that when a screen component receives focus, it does not result in a change in context including:\n1) submitting a form automatically;\n2) launching a new screen;\n3) changing focus to another component when a component receives focus; or\n4) any other change that could confuse or disorient the user."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.2.2.a",
        "issueDescription":  "A change of context occurs without warning when the user changes the setting of a user interface control.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI:\nFix this issue by using ONE of the following techniques:\n\n1. Ensure that entering text into a TextField or TextView, toggling a switch or selecting an item from a PickerView does not result in a substantial change in context including:\n\n1) submitting a form automatically\n2) Navigate to the next screen\n3) additional keyboard focus changes\n4) any other change that could confuse or disorient the user.\n\n2. Inform users ahead of time of such behavior by methods such as the text label for the UI control or some advisory text placed before the control that cautions the user of this behavior."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.2.3.a",
        "issueDescription":  "Navigational elements that occur across multiple pages or screens are not presented in the same relative order.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that navigation patterns that are repeated across screens are presented in the same relative order each time they appear throughout the site."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.2.4.a",
        "issueDescription":  "Components are labeled differently on different pages or screens, though they have the same function.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that components that have the same functionality across multiple screens are labelled consistently. This requirement extends to both visible labels and non-visible labels (such as an accessibilityLabel used on an icon or button).\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.2.6.a",
        "issueDescription":  "Help mechanism is not in a programmatically consistent location.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFor screens/pages where a particular help mechanism is provided, make sure that it is in a consistent programmatic location on each of those screens/pages. Programmatic location can be thought of as in the same relative code order within a screen/page area such as the header or footer.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.1.b",
        "issueDescription":  "The form field with an error is not identified in text, or text alternative, or via programmatic association.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by doing ONE of the following:\n1. Programmatically associate the error message with the text input in error — typically by using shouldGroupAccessibilityChildren = true on the container view to group the visible label and error message with the relevant text input. (STRONGLY PREFERRED)\n2. Include the field name in the error message.\n\nHOW TO FIX: SwiftUI:\nFix this issue by doing ONE of the following:\n1. Programmatically associate the error message with the text input in error — typically by grouping the error message and text input using .accessibilityElement(children: .combine) modifier. (STRONGLY PREFERRED)\n2. Include the field name in the error message.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject-swift.class/shouldgroupaccessibilitychildren\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityelement(children:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.1.b",
        "issueDescription":  "Error message cannot be read by screen readers.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by ensuring that the error message is not programmatically hidden or otherwise inaccessible.\n\nMake sure the error messages are accessible for the screen reader, use the isAccessibilityElement property to make it accessible.\nlabelofErrorMsg.isAccessibilityElement = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by ensuring that the error message is not programmatically hidden or otherwise inaccessible.\n\nMake sure the error messages are accessible for the screen reader, use the accessibilityHidden method to make it accessible.\nlabelofErrorMsg\n. accessibilityHidden(false)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.1.b",
        "issueDescription":  "Input validation failures are not described in text or a text alternative.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by doing ALL of the following:\n1. Provide an error message in text format.\n2. Include the field name in the error message and/or programmatically associate the error message with the text input in error — typically by using .accessibilityLabel to associate the error message with the relevant text input, or by grouping the error message and text input using for shouldGroupAccessibilityChildren function OR .accessibilityElement(children: .combine) modifier.\n3. Describe the reason for the error, being as specific as possible.\n\nNOTE: Programmatic association of the error message and text input is STRONGLY recommended.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject-swift.class/shouldgroupaccessibilitychildren\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityelement(children:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.2.a",
        "issueDescription":  "No visual label is present and the purpose of this field is not clear without a visual label.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the form field has a visible label and it is always visible.\n\nEnsure that the label is programmatically associated with the form fields via the accessibilityLabel property.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.2.a",
        "issueDescription":  "No persistent visual label is present for a select or dropdown control and the purpose of this field is not clear without a visual label.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the form field has a visible label and it is always visible.\n\nEnsure that the label is programmatically associated with the form fields via the accessibilityLabel property.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.2.a",
        "issueDescription":  "No visual group label is present and the purpose of this group is not clear without a visual label.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing a visible group label for the set of form fields.\n\nEnsure that the group label is programmatically associated with the form fields via the accessibilityLabel property.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.2.a",
        "issueDescription":  "Label is not persistent. For example: placeholder is being used as the only visual label for a text field.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by ensuring that the form field has a visible label and it is always visible.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.2.a",
        "issueDescription":  "Chat or IM input label is not persistent.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI:\nFix this issue by ensuring that the form field has a visible label and it is always visible.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.2.b",
        "issueDescription":  "Additional instructions are only provided for the input field to people who do not have disabilities. For a person with disabilities, the instructions are incomplete, inaccurate, or misleading.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nCommon solutions to fix this issue include:\n1. Provide essential instructions as text that is part of the field label.\n2. Provide essential instructions as text at the top of the form.\n3. Provide essential instructions as text before the intended field.\n4. Provide essential instructions when the field gains VoiceOver focus via accessibilityLabel by appending the label plus the instructions.\n5. Provide essential instructions as part of an accessible error message after the field input is validated."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.2.b",
        "issueDescription":  "Additional instructions are needed for the input field but are not provided for people with disabilities. People without disabilities have access to additional instructions.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nCommon solutions to fix this issue include:\n1. Provide essential instructions as text that is part of the field label.\n2. Provide essential instructions as text at the top of the form.\n3. Provide essential instructions as text before the intended field.\n4. Provide essential instructions when the field gains VoiceOver focus via accessibilityLabel by appending the label plus the instructions.\n5. Provide essential instructions as part of an accessible error message after the field input is validated.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.2.c",
        "issueDescription":  "The required field is not identified by any of the following means: its label or form-level instructions or an error message.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using ONE OR MORE of the following techniques:\n1. Use the field label to indicate in text that it is a required field.\n2. Provide text instructions at the beginning of the form or set of fields that describe which fields are required (or optional).\n3. Provide an error message that indicates the required field(s) that was/were not completed.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.3.a",
        "issueDescription":  "The error message does not indicate expected data format.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by providing the required data format in the error message, \nfor example: \"Enter the expiration date in format MM/YYYY\""
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.3.a",
        "issueDescription":  "The error message does not indicate expected range of data values.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by identifying the data range that is allowed for the form field in the error message."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.3.a",
        "issueDescription":  "There is no suggestion for how to fix a validation failure.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by identifying the reason for the error, for example:\nAn expiration date entry fails validation. Instead of a generic message such as \"Expiration date is not valid\", provide specific feedback as to what went wrong:\n1. If the entered date failed because the format was not valid, the message could say \"Enter the expiration date in mm/yyyy format\"\n2. If the entered date failed because the time frame was not valid, the message could say \"Expiration date must not be in the past\"\n3. If the entered date failed because invalid characters were entered, the message could say \"Expiration date must only contain numbers\""
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.4.a",
        "issueDescription":  "The \"Delete\"/\"Cancel\" button immediately triggers the deletion of the legal, financial, or data transaction on the database. Users do not have the ability to recover from an accidental deletion.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using AT LEAST ONE of the following techniques:\n1. Allow the user to confirm the deletion before it takes place.\n2. Allow the user to reverse the deletion request after it has been submitted."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.4.a",
        "issueDescription":  "Users are not given the opportunity to review and edit information before the data is submitted.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by allowing the user to review and edit the information or answer(s) before submission."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.4.a",
        "issueDescription":  "User does not get an opportunity to review and confirm the transaction before committing it. Nor is the action reversible.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by using AT LEAST ONE of the following techniques:\n1. Allow the user to review and edit the transaction data before it is submitted.\n2. Allow the user to reverse the transaction after it has been submitted."
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.7.a",
        "issueDescription":  "Process requires a user to re-enter information.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI:\nFix this issue by ensuring that throughout the process, the user is not asked to enter the same data twice. If data needs to be repeated in different steps of the process, options to satisfy the requirement include techniques such as:\n\na. Auto-populating the data\nb. Allowing selection of data in a dropdown\nc. Allowing text on the same screen to be copied and pasted\nd. Providing a checkbox to populate inputs with the same values as previously entered (e.g., my billing address is the same as my shipping address)\n\nThis Success Criterion does not require the web content / application to remember user information between sessions. However, when a process can run across different domains, such as a check-out process that includes a 3rd party payment provider, users must not be required to enter data twice even across domains that are part of the same process.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "3.3.8.a",
        "issueDescription":  "Authentication process requires the completion of a non-exempted cognitive function test and no mechanism is available to assist the user in completing the cognitive function test.",
        "recommendation":  "HOW TO FIX Swift/SwiftUI:\nFix this issue by ensuring that no step in the authentication process relies only on the completion of a cognitive function test without a mechanism to assist the user in completing the cognitive function test.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control is missing an accessible name/label.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using accessibilityLabel for controls with the corresponding actions. \n\ncontolObject.accessibilityLabel = \"Define Control purpose\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by using accessibilityLabel method for controls with the corresponding actions. \n\ncontolObject\n.accessibilityLabel(\"Define Control purpose\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control is missing a role.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by applying the correct accessibilityTraits property to convey the control\u0027s role.\n\ntitleLabelObject.accessibilityTrait = .button\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the correct accessibilityTraits method to convey the control\u0027s role.\n\ntitleLabelObject\n.accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control is missing both a role and an accessible name/label.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityLabel and accessibilityTraits property of the button that conveys the purpose or function of the button. \n\nbuttonSendEmail.accessibilityLabel   = \"Send me Email on existing offer.\" \nbuttonObject.accessibilityTraits  = .button \n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityLabel and accessibilityTraits methods of the button that conveys the purpose or function of the button. \n\ncontolObject\n.accessibilityLabel(\"Define Control purpose\")\n\ncontolObject\n.accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isbutton"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Form control is not programmatically associated with its visible label.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by implementing an associated visible label as the accessibilityLabel for the Text Field or Text View. \n\nformFieldObject.accessibilityLabel = \"Form Field Visible Label\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by implementing an associated visible label as the accessibilityLabel method for the Text Field or Text View. \n\nformFieldObject\n   .accessibilityLabel(\"Form Field Visible Label\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control is missing a necessary state.",
        "recommendation":  "HOW TO FIX: Swift/SwiftUI:\nFix this issue by updating accessibilityTraits property to convey the control\u0027s necessary state.\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control has an incorrect state.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityTraits property to convey the control state\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the trait/modifier/binding to convey the control state\n\nText(\"…\")\n    .accessibilityAddTraits(.isSelected)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control has an incorrect role.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the correct accessibilityTraits property to convey the control\u0027s role.\n\ntitleLabelObject.accessibilityTrait = .button\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the correct accessibilityTraits method to convey the control\u0027s role.\n\ntitleLabelObject\n.accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control has an incorrect role.",
        "recommendation":  "HOW TO FIX: Swift:\nFor informative content: fix this issue by updating the accessibilityTraits property of the static text (e.g. UILabel) that conveys the non-interactive role or state information. \n\nlabelObject.accessibilityTraits = [.staticText, .allowsDirectInteraction]\n\nFor non-informative (hidden) content: fix this issue by using the isAccessibilityElement property to make content hide for assistive technologies\n\nhiddenContent.isAccessibilityElement = false\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the correct accessibilityTraits method to convey the control\u0027s role.\n\ntitleLabelObject\n.accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The disabled state of a control is not conveyed to screen reader users.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityTrait as notEnabled for the interactive control to convey the control\u0027s disabled state information.\n\ncontrolObject.accessibilityTraits = [.notEnabled]\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the disabled modifier as true for the interactive control to convey the control\u0027s disabled state information.\n\ninteractiveObject\n.disabled(true)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/disabled(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The button does not have a role.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityTraits property to convey the button\u0027s role.\n\nbuttonObject.accessibilityTraits  = .button \n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityTraits method to convey the button\u0027s role.\n\nbuttonObject\n   .accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits/1620194-button\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isbutton"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The button is missing an accessible name/label. As a result its functionality or purpose is not conveyed to screen reader users.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityLabel property of the button that conveys the purpose or function of the button. \n\nbuttonSendEmail.accessibilityLabel   = \"Send me Email on existing offer.\" \n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityLabel method of the button that conveys the purpose or function of the button. \n\nbuttonSendEmail\n.accessibilityLabel(\"Send me Email on existing offer.\" )\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The button is missing both a role and an accessible name/label.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityLabel and accessibilityTraits property of the button that conveys the purpose or function of the button. \n\nbuttonSendEmail.accessibilityLabel   = \"Send me Email on existing offer.\" \nbuttonObject.accessibilityTraits  = .button \n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityLabel and accessibilityTraits methods of the button that conveys the purpose or function of the button. \n\nbuttonSendEmail\n.accessibilityLabel(\"Send me Email on existing offer.\" )\n.accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isbutton"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The selected state of a button is not conveyed to screen reader users.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityTraits property of the button that conveys the selected state information of the button. \n\nbuttonObject.accessibilityTraits = [.button,.selected]\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityTraits method of the button that conveys the selected state information of the button. \n\nbuttonObject\n         .accessibilityAddTraits(.isButton)\n         .accessibilityAddTraits(.isSelected)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isbutton\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isselected"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The expand/collapse state of a toggle-type element is missing or is used incorrectly.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityValue property of the button that conveys the current state information of the toggle-type component. \n\nif ... {\n                mytoggleobject.accessibilityValue=\"Collapsed\"\n            }else{\n                mytoggleobject.accessibilityValue=\"Expanded\"\n            }\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityValue method of the button that conveys the current state information of the toggle-type component. \n\nif ... {\ninteractiveObject\n.accessibilityValue(\"Collapsed\")\n}else{\ninteractiveObject\n.accessibilityValue(\"Expanded\")\n}\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615117-accessibilityvalue\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityvalue(_:)-2bwuz"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Informative text (static text) is implemented with an interactive role.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by remove the interactive trait and updating the accessibilityTraits property as the static text (e.g. UILabel) that conveys the non-interactive state information. \n\nlabelObject.text = \"Please wait\"\nlabelObject.accessibilityTraits = [.staticText]\n\nHOW TO FIX: SwiftUI:\nFix this issue by remove the interactive trait using accessibilityRemoveTraits method and updating the accessibilityTraits as the static text (e.g. Text) that conveys the non-interactive state information. \n \nText(\"Please wait\")\n                    .accessibilityAddTraits(.isStaticText)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isstatictext"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Informative text (static text) is implemented with an interactive role.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by remove the interactive trait and updating the accessibilityTraits property as the static text (e.g. UILabel) that conveys the non-interactive state information. \n\nlabelObject.text = \"Please wait\"\nlabelObject.accessibilityTraits = [.staticText]\n\nHOW TO FIX: SwiftUI:\nFix this issue by remove the interactive trait using accessibilityRemoveTraits method and updating the accessibilityTraits as the static text (e.g. Text) that conveys the non-interactive state information. \n \nText(\"Please wait\")\n                    .accessibilityAddTraits(.isStaticText)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isstatictext"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Informative text (static text) is implemented with a state.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by remove the selected trait and updating the accessibilityTraits property as the static text (e.g. UILabel) that conveys the non-interactive state information. \n\nlabelObject.text = \"Please wait\"\nlabelObject.accessibilityTraits = [.staticText]\n\nHOW TO FIX: SwiftUI:\nFix this issue by remove the selected trait using accessibilityRemoveTraits method and updating the accessibilityTraits as the static text (e.g. Text) that conveys the non-interactive state information. \n \nText(\"Please wait\")\n                    .accessibilityAddTraits(.isStaticText)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/view/disabled(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isstatictext"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Informative text (static text) is implemented with a state.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by remove the selected trait and updating the accessibilityTraits property as the static text (e.g. UILabel) that conveys the non-interactive state information. \n\nlabelObject.text = \"Please wait\"\nlabelObject.accessibilityTraits = [.staticText]\n\nHOW TO FIX: SwiftUI:\nFix this issue by remove the selected trait using accessibilityRemoveTraits method and updating the accessibilityTraits as the static text (e.g. Text) that conveys the non-interactive state information. \n \nText(\"Please wait\")\n                    .accessibilityAddTraits(.isStaticText)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/view/disabled(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isstatictext"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Actionable item lacks a role or semantic markup to indicate it is actionable (e.g. listview or tableview cell).",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using accessibilityTraits property with appropriate roles to make the control interactive like the button. \n\n self.accessibilityTraits = .button\n\nHOW TO FIX: SwiftUI:\nFix this issue by using accessibilityTraits method with appropriate roles to make the control interactive like the button. \n\ninteractiveObject\n  .accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uitableview\nhttps://developer.apple.com/documentation/uikit/uicollectionview\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/displaying-data-in-lists"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control that looks like an alert dialog or action sheet but doesn\u0027t behave like one.\r\n\r\n(Note: Old description \"A control looks like a UIAlertController but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by implementing the native UIAlertController (alert or action sheet style) to represent the UI. Ensure interactive actions are added to the alert for dismiss and other interactions. If a custom alert or custom modal view is used instead, restrict the screen reader focus within the custom modal view using the following:\n\n1. Set accessibilityViewIsModal to true on the custom modal container view to restrict VoiceOver focus within it:\n          customModalContainerView.accessibilityViewIsModal = true\n2. If VoiceOver does not automatically move focus to the modal, manually send focus to the modal\u0027s first interactive element using a layout changed notification:\n          UIAccessibility.post(\n              notification: UIAccessibility.Notification.layoutChanged,\n              argument: modalFirstObject\n          )\n\nHOW TO FIX: SwiftUI:\nFix this issue by implementing the native Alert or confirmationDialog to represent the UI. Ensure interactive actions are added for dismiss and other interactions. If a custom alert or custom modal view is used instead, restrict the screen reader focus within the custom modal view using the following:\n\n1. Use accessibilityViewIsModal via a UIViewRepresentable wrapper or apply it on the underlying UIView to restrict VoiceOver focus within the custom modal:\n          customModalContainerView.accessibilityViewIsModal = true\n2. If VoiceOver does not automatically move focus to the modal, manually send focus to the modal\u0027s first interactive element using ONE of the following: \n2.1 Using UIAccessibility post notification:\n          UIAccessibility.post(\n                 notification: UIAccessibility.Notification.layoutChanged,\n                 argument: modalFirstObject\n             )\n2.2 Using the modern AccessibilityNotification API (iOS 15+):\n          AccessibilityNotification.LayoutChanged(modalFirstObject).post()\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615089-accessibilityviewismodal\nhttps://developer.apple.com/documentation/uikit/uialertcontroller\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/ismodal\nhttps://developer.apple.com/documentation/accessibility/accessibilitynotification/announcement"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a text input but doesn\u0027t behave like one \r\n\r\n(Note: Old description \"A control looks like editable UITextView but doesn\u0027t behave like one\")",
        "recommendation":  "HOW TO FIX: Swift:\nUse accessibilityLabel property for the TextField/TextView to reference a visible label. \n\n let textField: UITextField = {\n            let tf = UITextField()\n            tf.placeholder = \"Enter Email\"\n            tf.accessibilityLabel = \"Email Address\"\n            tf.borderStyle = .roundedRect\n            tf.translatesAutoresizingMaskIntoConstraints = true\n            return tf\n        }()\n    \n    \n    let textView: UITextView = {\n            let tv = UITextView()\n             tv.accessibilityLabel = \"Address is\"\n            tv.layer.borderColor = UIColor.systemGray4.cgColor\n            tv.layer.borderWidth = 1\n            tv.layer.cornerRadius = 8\n            tv.translatesAutoresizingMaskIntoConstraints = true\n            return tv\n        }()\n\nHOW TO FIX: SwiftUI:\nUse the accessibilityLabel method for the TextField/TextEditor to reference a visible label. \n \n    TextField(\"Email\", text: $email)\n                .accessibilityLabel(\"Email address\")\n\n      Text(\"Address\")\n                .multilineTextAlignment(.leading)\n                .fixedSize()\n       TextEditor(text: $address)\n                .accessibilityLabel(\"Address Is\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uitextview\nhttps://developer.apple.com/documentation/swiftui/texteditor\nhttps://developer.apple.com/documentation/swiftui/textfield"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control opens Safari but is missing the link trait.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityTraits as a link to convey the intent, purpose, or meaning.\n\nlinkObject.accessibilityTraits = [.link]\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityTraits as a link to convey the intent, purpose, or meaning.\n\nText(\"…\")\n                .accessibilityAddTraits(.isLink)\n\nor\n\nUse the default Link control\n\n  Link(destination: URL(string: \"https://google.com\")!, label: {\n                    Text(\"….\")\n                        .underline()\n                })\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits/1620178-link\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/link"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a page indicator but doesn\u0027t behave like one.\r\n\r\n(Note: Old description \"A control looks like a UIPageControl but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the isAccessibilityElement, and accessibilityLabel properties for the pagecontrol object to convey the intent, purpose, or meaning.\n\npageControlObj.isAccessibilityElement = true\npageControlObj.accessibilityLabel = \"About the app\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityLabel properties for the TabView (page style) to convey the intent, purpose, or meaning.\n\npageControlObj.accessibilityLabel = \"About the app\"\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uipagecontrol\nhttps://developer.apple.com/documentation/swiftui/tabviewstyle/page"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a picker but doesn\u0027t behave like one\r\n\r\n(Note: Old description \"A control looks like a UIPickerView but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the ONE of the following techniques:\n1. Use UIPickerViewAccessibilityDelegate protocol to update the accessibilityLabel for the component.\n func pickerView(_ pickerView: UIPickerView, accessibilityLabelForComponent component: Int) -\u003e String? {\n        return \"Country Name: \"\n    }\n\n2. Using the accessibilityLabel property for the picker component to convey the intent, purpose, or meaning.\n\nlabelObject.accessibilityLabel = “Country Name: ”\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityLabel property for the picker component to convey the intent, purpose, or meaning.\n\nPicker(\"Please choose a color\", selection: $.....) {\n               ForEach(colors, id: \\.self) {\n                   Text($0)\n                       .accessibilityLabel(\"Choose Color \" + $0)\n               }\n           }\n           .pickerStyle(.wheel)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uipickerview\nhttps://developer.apple.com/documentation/uikit/uipickerviewaccessibilitydelegate\nhttps://developer.apple.com/documentation/swiftui/picker"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a date picker but doesn\u0027t behave like one\r\n\r\n(Note: Old description \"A control looks like a UIDatePicker but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the accessibilityLabel property for the date picker object component to convey the intent, purpose, or meaning.\n\ndataPickerObject.accessibilityLabel = “select Date”\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityLabel method for the date picker object component to convey the intent, purpose, or meaning.\n\nDatePicker(selection: $birthDate, in: ...Date.now, displayedComponents: .date) {\n                                          ….\n                                      }\n                            .accessibilityLabel(\"Select a Date\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uidatepicker\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a popover but doesn\u0027t behave like one\r\n\r\n(Note: Old description \"A control looks like a UIPopoverPresentationController but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the native Popover view and .popover modifier. \n\nHOW TO FIX: SwiftUI:\nFix this issue by using the native Popover view and .popover modifier. \n\n Button(\"Show Menu\") {\n            showingPopover = true\n        }\n        .popover(isPresented: $showingPopover) {\n           popoverview\n           ...\n        }\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uipopoverpresentationcontroller\nhttps://developer.apple.com/documentation/swiftui/view/popover(ispresented:attachmentanchor:arrowedge:content:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a progress bar but doesn\u0027t behave like one\r\n\r\n(Note: Old description \"A control looks like a UIProgressView but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement, accessibilityLabel property for the progress view object to convey the intent, purpose, or meaning.\n\nmyProgressView.isAccessibilityElement = true\nmyProgressView.accessibilityLabel = “Download Progress”\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the default label property or accessibilityLabel method for the progress view object to convey the intent, purpose, or meaning. The accessibilityLabel method will override the default label value.\n\nProgressView(\"Download Progress\")\n                    .progressViewStyle(.linear)\n                    .accessibilityLabel(\"Loading.....\")\n\nOR\n\nProgressView(\"Download Progress\")\n                    .progressViewStyle(.linear)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uiprogressview\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/progressview"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a search bar but doesn\u0027t behave like one\r\n\r\n(Note: Old description \"A control looks like a UISearchBar but doesn\u0027t behave like one\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement, accessibilityLabel property for the search bar object to convey the intent, purpose, or meaning.\n\nsearchBarObj.isAccessibilityElement = true\nsearchBarObj.accessibilityLabel = \"Search by name.\" \n\nHOW TO FIX: SwiftUI:\nFix this issue by following ONE of the techniques: \n1.        Use the default searchable method for the navigation stack \nNavigationStack {\n………\n          }\n        .searchable(text: …..)\n\n2.        Use the customizable search bar by using the TextField with the trait of isSearchField to convey the intent, purpose, or meaning.\n           TextField(\" Search by Name\", text: ….)\n                     .accessibilityAddTraits(.isSearchField)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uisearchbar\nhttps://developer.apple.com/documentation/swiftui/adding-a-search-interface-to-your-app\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/issearchfield"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a Segmented Control but doesn\u0027t behave like one\r\n\r\n(Note: Old description \"A control looks like a UISegmentedControl but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement, accessibilityLabel property for the segmented control object to convey the intent, purpose, or meaning.\n\nlet segment1 : NSString = \"iOS\"\nsegment1.accessibilityLabel = \"Select iOS\"\nsegmetnControl.setTitle(segment1 as String, forSegmentAt: 0)\nlet segment2 : NSString = \"Android\"\nsegment2.accessibilityLabel = \"Select Android\"\nsegmetnControl.setTitle(segment2 as String, forSegmentAt: 1)\nlet segment3 : NSString = \"Linux\"\nsegment3.accessibilityLabel = \"Select Linux\"\nsegmetnControl.setTitle(segment3 as String, forSegmentAt: 2)\n\nHOW TO FIX: SwiftUI:\nUsing the default Picker as a segmented style. \nPicker(\"Select RuleType\", selection: …..) {\n…\n}\n.pickerStyle(.segmented)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615117-accessibilityvalue\nhttps://developer.apple.com/documentation/uikit/uisegmentedcontrol\nhttps://developer.apple.com/documentation/swiftui/pickerstyle/segmented"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a slider but doesn\u0027t behave like one\r\n\r\n(Note: Old description \"A control looks like a UISlider but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement, accessibilityLabel property for the slider object to convey the intent, purpose, or meaning.\n\n self.isAccessibilityElement = true\n self.accessibilityLabel = \"Set Volume\"\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityLabel method for the slider object to convey the intent, purpose, or meaning.\n\n  Slider(value: $rotation, in: 0...360)\n                    .accessibilityLabel(\"Set Volume\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615117-accessibilityvalue\nhttps://developer.apple.com/documentation/uikit/uislider\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a stepper but doesn\u0027t behave like one.\r\n\r\n(Note: Old description \"A control looks like a UIStepper but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the native components to represent the Stepper.\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the native components to represent the Stepper.\n\nStepper(\"What\u0027s your age?\", value: $..)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uistepper\nhttps://developer.apple.com/documentation/swiftui/stepper"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a toggle switch but doesn\u0027t behave like one.\r\n\r\n(Note: Old description \"A control looks like a UISwitch but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement, accessibilityLabel, accessibilityTraits, accessibilityHint and accessibilityValue property for the switch control to convey the intent, purpose, or meaning.\n\n self.isAccessibilityElement = true\n self.accessibilityLabel = setAccessibilityLabel + \"Switch\"\n self.accessibilityHint = \"Double Tap to Toggle Settings\"\n self.accessibilityTraits = .button\n self.accessibilityValue = self.isOn ? \"On\" : \"Off\"\n\nFor best practice use the default native switch control.\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the native components to represent the Toggle.\n\n Toggle(\"Email Notification\", isOn: $...)\n\nNote: For the custom one we can use  .accessibilityRepresentation {\n            Toggle(isOn: $isOn, label: {\n                Text(\"Dark mode is \\(getDarkModeStatus().localized)\")\n            })\n        }\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615117-accessibilityvalue\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits/1620194-button\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615093-accessibilityhint\nhttps://developer.apple.com/documentation/uikit/uiswitch\nhttps://developer.apple.com/documentation/swiftui/toggle"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a text input but doesn\u0027t behave like one \r\n\r\n(Note: Old description \"A control looks like UITextField but doesn\u0027t behave like one\")",
        "recommendation":  "HOW TO FIX: Swift:\nUse accessibilityLabel property for the TextField/TextView to reference a visible label. \n\n let textField: UITextField = {\n            let tf = UITextField()\n            tf.placeholder = \"Enter Email\"\n            tf.accessibilityLabel = \"Email Address\"\n            tf.borderStyle = .roundedRect\n            tf.translatesAutoresizingMaskIntoConstraints = true\n            return tf\n        }()\n    \n    let textView: UITextView = {\n            let tv = UITextView()\n             tv.accessibilityLabel = \"Address is\"\n            tv.layer.borderColor = UIColor.systemGray4.cgColor\n            tv.layer.borderWidth = 1\n            tv.layer.cornerRadius = 8\n            tv.translatesAutoresizingMaskIntoConstraints = true\n            return tv\n        }()\n\nHOW TO FIX: SwiftUI:\nUse the accessibilityLabel method for the TextField/TextEditor to reference a visible label. \n \n    TextField(\"Email\", text: $email)\n                .accessibilityLabel(\"Email address\")\n\n      Text(\"Address\")\n                .multilineTextAlignment(.leading)\n                .fixedSize()\n       TextEditor(text: $address)\n                .accessibilityLabel(\"Address Is\")\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/uikit/uitextview\nhttps://developer.apple.com/documentation/swiftui/texteditor\nhttps://developer.apple.com/documentation/swiftui/textfield"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a tab bar but doesn\u0027t behave like one.\r\n\r\n(Note: Old description \"A control looks like a UITabBar but doesn\u0027t behave like one.\")",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by following ONE of the techniques:\n1. Using the native components to represent the TabBar.\n2. Using a custom tab bar, VoiceOver announces as \"[accessibilityLabel]/Tab Title, Tab, 1 of 3\"\n\nHOW TO FIX SwiftUI:\nFix this issue by following ONE of the techniques:\n1. Using the native components to represent the TabView.\n2. Using a custom tab view, VoiceOver to announce as \"[accessibilityLabel]/Tab Title, Tab, 1 of 3\"\nNote: the currently selected tab would announce as \"Selected\" \"[accessibilityLabel]/Tab Title, Tab, 1 of 3\" \n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uitabbarcontroller\nhttps://developer.apple.com/documentation/SwiftUI/TabView"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A custom control is not accessible.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement property to true.\n\nmybutton.isAccessibilityElement = true\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityLabel and accessibilityTraits methods of the control that conveys the purpose or function of the control. \n\ninteractiveObject\n.accessibilityLabel(\"Submit\")\n.accessibilityAddTraits(.isButton)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The custom checkbox control is not accessible.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the accessibilityLabel and accessibilityValue properties for the custom checkbox to convey the intent, purpose, or meaning of the custom checkbox.\n\nself.accessibilityHint = \"Double tap to toggle\"\n if isChecked == true{\n                self.accessibilityLabel = \"Agree? checkbox\"\n                self.accessibilityValue = \"Checked\"\n            }else{\n                self.accessibilityLabel = \"Agree? checkbox\"\n                self.accessibilityValue = \"Unchecked\"\n            }\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityLabel and accessibilityValue methods for the custom checkbox to convey the intent, purpose, or meaning of the custom checkbox.\n\ninteractiveObject .accessibilityHint(\"Double tap to toggle\")\nif isChecked == true{\ninteractiveObject\n.accessibilityLabel(\"Agree? checkbox \")\ninteractiveObject\n.accessibilityValue(\"Checked\")\n}else{\ninteractiveObject\n.accessibilityLabel(\"Agree? checkbox \")\ninteractiveObject\n.accessibilityValue(\"Unchecked\")\n}\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615117-accessibilityvalue\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityvalue(_:)-8esl7"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The custom radio button control is not accessible.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the isAccessibilityElement property to make the custom radio button available for VoiceOver. Make sure the custom radio button is enabled, by applying isEnabled to true for the custom radio button.  \nUpdate the self.accessibilityLabel property to make the the custom radio button to convey the intent, purpose, or meaning of the custom radio button.\n\ncustomRadioButton.isEnabled = true\ncustomRadioButton.isAccessibilityElement = true\ncustomRadioButton.accessibilityLabel = \"Payment Creadit Card?\"\n\nif ... if isChecked == true{\nself.accessibilityValue = \"Checked\"\n}else{\nself.accessibilityValue = \"Unchecked\"\n}\n\nHOW TO FIX: SwiftUI:\nFix this issue by using the accessibilityLabel and accessibilityValue method for the custom radio button to convey the intent, purpose, or meaning of the custom radio button.\n\nif isChecked == true{\ninteractiveObject\n.accessibilityLabel(\"Agree? Radio button\")\ninteractiveObject\n.accessibilityValue(\"Checked\")\n}else{\ninteractiveObject\n.accessibilityLabel(\"Agree? Radio button\")\ninteractiveObject\n.accessibilityValue(\"Unchecked\")\n}\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel\nhttps://developer.apple.com/documentation/objectivec/nsobject/1615117-accessibilityvalue\nhttps://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityvalue(_:)-8esl7"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The custom select element is missing required roles and/or states or properties.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by updating the accessibilityTraits property of the control that conveys the purpose or function of the control and its state. For example control missing button role and selected state.\ncontolObject.accessibilityTraits = [.button, .selected]\n\nHOW TO FIX: SwiftUI:\nFix this issue by updating the accessibilityAddTraits modifier of the control that conveys the purpose or function of the control and its state. \n\nFor example control missing \ncontolObject\n.accessibilityAddTraits(.isButton).accessibilityAddTraits(.isSelected)\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibilitytraits\nhttps://developer.apple.com/documentation/swiftui/view/accessibilityaddtraits(_:)\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isbutton\nhttps://developer.apple.com/documentation/uikit/uicollectionviewcell/isselected\nhttps://developer.apple.com/documentation/swiftui/accessibilitytraits/isselected"
    },
    {
        "platform":  "iOS",
        "checkpoint":  "4.1.3.a",
        "issueDescription":  "Status message is not automatically announced by the screen reader.",
        "recommendation":  "HOW TO FIX: Swift:\nFix this issue by using the UIAccessibility post notifications announcement so the screen reader can announce messages \nUIAccessibility.post(notification: UIAccessibility.Notification.announcement, argument: \"Status Message Text\")\n\nHOW TO FIX: SwiftUI:\nFix this issue by using ONE of the following techniques: \n1. Use the UAccessibility post notifications announcement so the screen reader can announce timeout warning messages. Implement this in the ViewModel and call that function in the SwiftUI actionable block. \nUIAccessibility.post(notification: UIAccessibility.Notification.announcement, argument: \" Status Message Text\") \n\n2. Use the AccessibilityNotification. AccessibilityNotification.Announcement(AttributedString(\"Status Message Text\")).post()\n\nREFERENCE: \nApple:\nhttps://developer.apple.com/documentation/uikit/uiaccessibility/notification/1620176-announcement\nhttps://developer.apple.com/documentation/accessibility/accessibilitynotification/announcement"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.a",
        "issueDescription":  "The image is changing dynamically but the text alternative doesn\u0027t correspond to the active image displayed.",
        "recommendation":  "Fix this issue by updating the contentDescription property as the ImageView changes. \n\nThe play button changes to a pause button:\n\nUsing Java:\nif (...) {\n            imageObj.setContentDescription(\"Play\");\n        } else {\n            imageObj.setContentDescription(\"Pause\");\n        }\n\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/functional\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.a",
        "issueDescription":  "The text alternative does not serve the same purpose as the image.",
        "recommendation":  "Fix this issue by implementing the contentDescription property for the active ImageView to describe its destination, purpose, or function.\n\nUse ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"ABCD Home\"\n\n2. Using Java:\nimageObj.setContentDescription(\"ABCD Home\");\n\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/functional\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.a",
        "issueDescription":  "The text alternative for the active image is missing.",
        "recommendation":  "Fix this issue by implementing the contentDescription property for the ImageView to convey the destination, purpose, or function of the image.\n\nUse ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"ABCD Home\"\n\n2. Using Java:\nimageObj.setContentDescription(\"ABCD Home\");\n\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/functional\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.a",
        "issueDescription":  "The text alternative does not contain the essential text in the active image, and therefore does not present the same information as the image.",
        "recommendation":  "Fix this issue by ensuring that the contentDescription property for the active ImageView, includes all essential text in the image so it accurately describes its destination, purpose, or function.\n\nUse ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"ABCD Home\"\n\n2. Using Java:\nimageObj.setContentDescription(\"ABCD Home\");\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/functional\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "The text alternative does not present the same information as the image.",
        "recommendation":  "Fix this issue by ensuring that the contentDescription property for the informative image describes its intent, purpose, or meaning.\n\nUse ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\"\n\n2. Using Java:\nimageObj.setContentDescription(\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\");\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/informative\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "The image is changing dynamically but the text alternative doesn\u0027t correspond to the informative image displayed.",
        "recommendation":  "Fix this issue by updating the contentDescription property of the ImageView as the image changes.\n\nUsing Java:\nif (...) {\n            imageObj.setContentDescription(\"Play\");\n        } else {\n            imageObj.setContentDescription(\"Pause\");\n        }\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/informative\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "Text alternative for the informative image is missing",
        "recommendation":  "Fix this issue by: \n1. Using the importantForAccessibility property to make the ImageView accessible for screen readers.\n2. Using the contentDescription property of the ImageView to convey the intent, purpose, or meaning of the image.\n\nUse ONE of the following techniques:\n1. Using XML:\nandroid:importantForAccessibility=\"yes\"\nandroid:contentDescription=\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\"\n\n2. Using Java:\nimageObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\nimageObj.setContentDescription(\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\");\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/informative\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "Text alternative for the informative image is missing",
        "recommendation":  "Fix this issue by ensuring that the contentDescription property of the ImageView describes its intent, purpose, or meaning. \n\nUse ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\"\n\n2. Using Java:\nimageObj.setContentDescription(\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\");\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/informative\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.b",
        "issueDescription":  "The text alternative does not contain the essential text in the informative image, and therefore does not present the same information as the image.",
        "recommendation":  "Fix this issue by ensuring that the contentDescription property of the ImageView, includes all essential text in the image so it accurately describes its intent, purpose, or meaning. \n\nUse ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\"\n\n2. Using Java:\nimageObj.setContentDescription(\"The sun setting over the Pacific Ocean, with a silhouette of a flying seagull in the foreground\");\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/informative\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "The detailed textual description of the complex image is not adequate to convey its full meaning.",
        "recommendation":  "Fix this issue by ensuring that the contentDescription property of the ImageView gives a full description of the content presented visually in the image.\n\nUsing ONE of the following  techniques\n\n1. Using XML:\nandroid:contentDescription=\"A bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\"\n\n2. Using Java:\nimageObj.setContentDescription(\"A bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "The detailed textual description of the complex image is missing.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1. Fix this issue by ensuring that the contentDescription property of the ImageView gives a detailed textual description of the content presented visually in the image.\n1.1 Using XML:\nandroid:contentDescription=\"A bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\"\n1.2 Using Java:\nimageObj.setContentDescription(\"A bar graph showing data of the number of students that love pizza, burger and salad. the graph plots pizza, burger and salad on the x-axis, and numbers on the y-axis and shows 15 for pizza, 24 for burger, and 11 for salad\");\n2. Provide the detailed description in the context of the page itself.\n3. Provide a button that expands a collapsed region that contains the detailed description.\n4. Provide a button to open a dialog that contains the detailed description.\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "A short text alternative for a complex image is missing.",
        "recommendation":  "Fix this issue by: \n1. Using the importantForAccessibility property to make the ImageView accessible for screen readers.\n2. Using the contentDescription property of the ImageView to convey the intent, purpose, or meaning of the image.\n\nUsing ONE of the following techniques:\n1. Using XML:\nandroid:importantForAccessibility=\"yes\"\nandroid:contentDescription=\"Sales results by quarter. The extended description is below the chart\"\n\n2. Using Java:\nimageObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\nimageObj.setContentDescription(\"Sales results by quarter. The extended description is below the chart\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "The complex image is missing both short and detailed text alternatives.",
        "recommendation":  "Fix this issue by providing both a short text alternative on the image itself and a complete long description. Use the contentDescription property on the ImageView component to convey the intent, purpose, or meaning of the image.\n\nUsing ONE of the following techniques to provide short text alternative:\n1. Using XML:\nandroid:contentDescription=\"Sales results by quarter. The extended description is below the chart\"\n2. Using Java:\nimageObj.setContentDescription(\"Sales results by quarter. The extended description is below the chart\");\n\nAnd using ONE of the following techniques to provide long description:\n1. Provide the long description in the context of the screen itself.\n2. Provide a button that expands a collapsed region that contains the long description.\n3. Provide a button to open a dialog that contains the long description.\n4. Provide a link to a long description on another screen via a normal link text.\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.c",
        "issueDescription":  "The short text alternative for the complex image is not appropriate or meaningful.",
        "recommendation":  "Fix this issue by ensuring that the short alternative text for the image gives a meaningful description of the main purpose or content of the image and refers to the location of the long description.\n\nUsing ONE of the following techniques:\n1. Using XML:\nandroid:contentDescription=\"Sales results by quarter. Extended description is below the chart.\"\n2. Using Java:\nimageObj.setContentDescription(\"Sales results by quarter. Extended description is below the chart.\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.d",
        "issueDescription":  "The decorative image is not hidden from screen readers.",
        "recommendation":  "Fix this issue by implementing the importantForAccessibility property of the ImageView to \"no\".\n\nUse ONE of the following techniques:\n\n1. Using XML:\nandroid:importantForAccessibility=\"no\"\n\n2. Using Java:\nimageObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO);REFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/images/decorative\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.h",
        "issueDescription":  "The text alternative is not appropriate.",
        "recommendation":  "Fix this issue by ensuring that the contentDescription property for the media file object accurately describes the purpose or title of the media content.\n\nUse ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"The Audio file about Accessibility Features\"\n\n2. Using Java:\nmediaFileObj.setContentDescription(\"The Audio file about Accessibility Features\");\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.1.1.h",
        "issueDescription":  "There is no text alternative to describe the media file.",
        "recommendation":  "Fix this issue by ensuring that the contentDescription property for the media file object conveys the media purpose or title.\n\nUse ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"The Audio file about Accessibility Features\"\n\n2. Using Java:\nmediaFileObj.setContentDescription(\"The Audio file about Accessibility Features\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "No text transcript is provided.",
        "recommendation":  "Fix this issue by providing a complete and accurate text transcript for the audio content.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/transcripts"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "A text transcript is provided, but it is incorrect or inadequate.",
        "recommendation":  "Fix this issue by providing a complete and accurate text transcript for the audio content.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/transcripts"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "A text transcript is provided but it doesn\u0027t describe all important sound effects.",
        "recommendation":  "Fix this issue by providing a complete and accurate text transcript for the audio content including all background sounds, sound effects, background music, and other descriptions like a person\u0027s tone.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/transcripts"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "A text transcript is provided but it doesn\u0027t identify all the speakers.",
        "recommendation":  "Fix this issue by providing a complete and accurate text transcript for the audio content including the identity of each speaker.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/transcripts"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.1.a",
        "issueDescription":  "A text transcript is provided but some of the dialogue is missing.",
        "recommendation":  "Fix this issue by providing a complete and accurate text transcript for the audio content.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/transcripts"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.1.b",
        "issueDescription":  "A text or audio description is provided, but it does not adequately describe the video content.",
        "recommendation":  "Fix this issue by ensuring that the text transcript or audio description conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/transcripts"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.1.b",
        "issueDescription":  "Neither a text description nor audio description is available for video-only content",
        "recommendation":  "Fix the issue by providing text description OR audio description for visual content.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/transcripts"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are not provided for the recorded multimedia content.",
        "recommendation":  "Fix this issue by adding complete, accurate, synchronized captions (open or closed) to the multimedia content.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded media, but they are incorrect or inadequate.",
        "recommendation":  "Fix this issue by ensuring that the captions provide a complete and accurate description of all dialogue, speakers, and important background sounds.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded multimedia, but they are not synchronized with the multimedia.",
        "recommendation":  "Fix this issue by synchronizing captions with the video.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded multimedia, but they are difficult to read due to poor contrast between the captions and their background.",
        "recommendation":  "Fix this issue by ensuring that the captions have adequate contrast with their background.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded media, but some of the dialogue is missing.",
        "recommendation":  "Fix this issue by ensuring that the captions provide a complete and accurate description of all dialogue.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded multimedia, but they do not describe all important sound effects.",
        "recommendation":  "Fix this issue by ensuring that the captions include a description of all important background sounds\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.2.a",
        "issueDescription":  "Captions are provided for recorded multimedia, but they do not identify all the speakers.",
        "recommendation":  "Fix this issue by ensuring that the captions identify all speakers under the following conditions:\n\n1. If the speaker is offscreen\n2. If multiple speakers are present within the same frame\n3. If there are other times when a speaker in the video isn\u0027t obvious\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.3.a",
        "issueDescription":  "The audio description provided is not correct or is inadequate.",
        "recommendation":  "Fix this issue by ensuring that the audio description conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/audio-descriptions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.3.a",
        "issueDescription":  "Neither a text description nor audio description is available for multimedia content.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n\n1. Text Transcript: A full-text description that conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc.\n\n2. Audio Description: A synchronized soundtrack with an audio description that conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/audio-descriptions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.3.a",
        "issueDescription":  "The text description provided is not correct or is inadequate.",
        "recommendation":  "Fix this issue by ensuring that the text transcript conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/audio-descriptions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are not provided  for the live multimedia content.",
        "recommendation":  "Fix this issue by adding complete, accurate, synchronized captions to the multimedia content.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live media, but they are incorrect or inadequate.",
        "recommendation":  "Fix this issue by ensuring that the captions provide a complete and accurate description of all dialogue, background sounds, speakers, and important background sounds.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live multimedia, but they are not synchronized with the multimedia.",
        "recommendation":  "Fix this issue by synchronizing captions with the video.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live multimedia, but they are difficult to read due to poor contrast between the captions and their background.",
        "recommendation":  "Fix this issue by ensuring that the captions have adequate contrast with their background.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live media, but some of the dialogue is missing.",
        "recommendation":  "Fix this issue by ensuring that the captions provide a complete and accurate description of all dialogue\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live multimedia, but they do not describe all important sound effects.",
        "recommendation":  "Fix this issue by ensuring that the captions include a description of all important background sounds.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.4.a",
        "issueDescription":  "Captions are provided for the live multimedia,  but they do not identify all the speakers.",
        "recommendation":  "Fix this issue by ensuring that the captions identify all speakers under the following conditions:\n\n1. If the speaker is offscreen\n2. If multiple speakers are present within the same frame\n3. If there are other times when a speaker in the video isn\u0027t obvious\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/captions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.5.a",
        "issueDescription":  "The audio description provided is not correct or is inadequate.",
        "recommendation":  "Fix this issue by ensuring that the audio description conveys all significant visual information such as scenes, significant actions, text on the screen, facial expressions, etc.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/audio-descriptions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.2.5.a",
        "issueDescription":  "An audio description is not provided.",
        "recommendation":  "Fix this issue by including an audio description that conveys all important visual information such as scenes, important actions, text on the screen, facial expressions, etc.\nREFERENCE:\nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/audio-video/audio-descriptions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.a",
        "issueDescription":  "Information, structure, or relationship is presented visually but is not conveyed programmatically or in text.",
        "recommendation":  "Fix this issue by doing ONE OR MORE of the following:\n1. Use a text-based method to convey the meaning of the visual information or relationship. The text can be provided for screen readers only or be visible on screen.\n2. When available use appropriate standard native components.\n3. Use the contentDescription property to provide programmatic information for the screen readers.   \n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.a",
        "issueDescription":  "Semantic markup has been used inappropriately and misrepresents the meaning, structure, or relationships of the content.",
        "recommendation":  "Fix this issue by removing incorrect semantic coding to conveys appropriate meaning, structure or relationship of the content.\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.a",
        "issueDescription":  "Incorrect semantic markup is used.",
        "recommendation":  "Fix this issue by using the correct semantic code for the component. See Issue Details for more information.\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.a",
        "issueDescription":  "Text that is shown visually as being deleted or inserted is not identified for screen readers either programmatically or in text.",
        "recommendation":  "Fix this issue by implementing the contentDescription property on the view object to convey that it\u0027s a deleted item.\n\nFix this issue by using ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"Price reduced! Old Price $ 100, New Price $ 75\"\n\n2. Using Java:\ntextObject.setContentDescription(\"Price reduced! Old Price $ 100, New Price $ 75\");\n \nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.b",
        "issueDescription":  "Data is arranged visually like a data table, but the screen reader does not read the required header cells along with the individual pieces of data content.",
        "recommendation":  "Fix this issue by doing ALL of the following:\n1. Implement the information that appears logically as a data table by using standard components, such as TableLayout and TableRow views for table and row definitions etc.\n2. Ensure that header cell and data cell relationships are correctly conveyed according to the complexity of the table.\n3. Append the contentDescription of a data cell information with column header and row header (if applicable) e.g. CellInformation.contentDescription = ColumnHeader.text! + \"\", \"\" + RowHeader.text! + \"\", \"\" + CellInformation.text!\n\nUsing Java:\ncellOneOfDataRowOne.setContentDescription(\"Company : \\(celldet.CompanyName) \" + \"Car : \\(celldet.CarName)\" + \"Cost : $ \\(celldet.Cost)\");\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/structure/tables\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.e",
        "issueDescription":  "Text appears and functions like a section heading but is not marked up as such.",
        "recommendation":  "Fix this issue by updating the accessibilityHeading property as true to convey the label as a heading.\n \nUse ONE of the following techniques\n\n1. Using XML:\nandroid:accessibilityHeading=\"true\"\n\n2. Using Java:\ntextView.setAccessibilityHeading(true);\n\nPlease note, that Android supports accessibilityHeading property from Android 9 Pie (API 28+ onwards).\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/structure/headings\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityHeading"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.e",
        "issueDescription":  "Text that does not serve as a section heading is inappropriately coded as a heading.",
        "recommendation":  "Fix this issue by updating the accessibilityHeading property as false or removing the accessibilityHeading property to convey the label as a static text.\n \nUse ONE of the following techniques\n\n1. Using XML:\nandroid:accessibilityHeading=\"false\"\n\n2. Using Java:\ntextView.setAccessibilityHeading(false);\n\nPlease note, that Android supports accessibilityHeading property from Android 9 Pie (API 28+ onwards).\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/structure/headings\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityHeading"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.f",
        "issueDescription":  "Content appears like a list but is not coded up as such.",
        "recommendation":  "Fix this issue by implementing RecyclerView. A RecyclerView is a flexible and efficient way to display a scrolling list of items.\n\nAlternatively, you can fix this issue by implementing ListView. ListView is an older alternative to RecyclerView and is still used in some scenarios. It works similarly, allowing you to display a scrolling list of items. However, it is generally less efficient than RecyclerView for handling large data sets.\nREFERENCE: \nDeque University: https://dequeuniversity.com/class/mobile-android-techniques/structure/lists\n\nGoogle:\nhttps://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView\n\nhttps://developer.android.com/reference/android/widget/ListView"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.f",
        "issueDescription":  "Content is not a list but it is coded as such.",
        "recommendation":  "Fix this issue by implementing the content other than RecyclerView or ListView component.\nREFERENCE: \nDeque University: https://dequeuniversity.com/class/mobile-android-techniques/structure/lists\n\nGoogle:\nhttps://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView\n\nhttps://developer.android.com/reference/android/widget/ListView"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.1.f",
        "issueDescription":  "The list or list item is not marked up properly.",
        "recommendation":  "Fix this issue by implementing RecyclerView. A RecyclerView is a flexible and efficient way to display a scrolling list of items.\n\nAlternatively, you can fix this issue by implementing ListView. ListView is an older alternative to RecyclerView and is still used in some scenarios. It works similarly, allowing you to display a scrolling list of items. However, it is generally less efficient than RecyclerView for handling large data sets.\nREFERENCE: \nDeque University: https://dequeuniversity.com/class/mobile-android-techniques/structure/lists\n\nGoogle:\nhttps://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView\n\nhttps://developer.android.com/reference/android/widget/ListView"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Reading order of static content changes meaning",
        "recommendation":  "Fix this issue by ensuring that the reading order of the content is logical. Use the accessibilityTraversalAfter or the accessibilityTraversalBefore property to set the reading order for the screen reader.\n\nUse ONE of the following techniques\n\n1. Using XML:\n\u003cTextView\nandroid:id=\"@+id/textView1\"\nandroid:text=\"Start Time\"/\u003e\n\u003cTextView\nandroid:id=\"@+id/textView2\"\nandroid:text=\"02: 30 PM\"\nandroid:accessibilityTraversalAfter=\"@id/textView1\"/\u003e\n\u003cTextView\nandroid:id=\"@+id/textView3\"\nandroid:text=\"End time\"\nandroid:accessibilityTraversalAfter=\"@id/textView2\"/\u003e\n\u003cTextView\nandroid:id=\"@+id/textView4\"\nandroid:text=\"06:30 PM\"\nandroid:accessibilityTraversalAfter=\"@id/textView3\"/\u003e\n\n2. Using Java:\nTextView starttimeL = findViewById(R.id.textView6);\nTextView starttimeV = findViewById(R.id.textView);\nstarttimeV.setAccessibilityTraversalAfter(starttimeL.getId());\nTextView endtimeL = findViewById(R.id.textView5);\nendtimeL.setAccessibilityTraversalAfter(starttimeV.getId());\nTextView endtimeV = findViewById(R.id.textView2);\nendtimeV.setAccessibilityTraversalAfter(endtimeL.getId());\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/structure/reading-order\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalAfter\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalBefore"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Informative (static) content is not readable by a screen reader.",
        "recommendation":  "Fix this issue by ensuring that all meaningful text content can be accessed programmatically by users of assistive technologies. Hiding redundant or extraneous content from screen readers may be done only if the act of hiding this content is intended to improve the experience for users of assistive technologies and identical or equivalent meaning is provided in another way. \n\nUse the importantForAccessibility property to make the static content is accessible by a screen reader. Use ONE of the following techniques\n\n1. Using XML:\nandroid:importantForAccessibility=\"yes\"\n\n2. Using Java:\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/structure/reading-order\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Informative (static) content is not readable by a screen reader.",
        "recommendation":  "Fix this issue by using the contentDescription property of the static content component to convey the same information of static content.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:contentDescription=\"informative content goes here\"\n\n2. Using Java:\nviewObj.setContentDescription(\"informative content goes here\");REFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/structure/reading-order\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Content that is intended to be hidden from all users is readable with a screen reader.",
        "recommendation":  "Fix this issue by removing the element for assistive technology users, implement importantForAccessibility property to hide the content. Use ONE of the following techniques:\n\n1. Using XML:\nandroid:importantForAccessibility=\"no\"\n\n2. Using Java:\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO);\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/structure/reading-order\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Static text displayed and screen reader announcement do not match and the intended meaning of the content is changed.",
        "recommendation":  "Fix this issue by implementing the contentDescription property to ensure the same meaning for the visible content, is provided for the screen reader users.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:contentDescription=\"Same displayed static text\"\n\n2. Using Java:\nviewObj.setContentDescription(\"Same displayed static text\");REFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Screen reader focus is lost or placed on the wrong element during user interaction, content refresh or update, or other reason.",
        "recommendation":  "Fix this issue by explicitly placing focus on a logical component when content is removed, refreshed, or added, for example:\n1. For content added to the screen in reaction to a user-fired event, focus should be shifted to the new content.  \n2. For content removed from the screen in reaction to a user-fired event, focus should be shifted to the next logical place in the interaction.\n\nUsing Java:\nUse sendAccessibilityEvent as focused to move accessibility focus:\nsomeargument?.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED)\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityEvent#TYPE_VIEW_FOCUSED"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "When the modal dialog is activated, screen reader focus is not placed on/in it.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1. Use the native component such as AlertDialog or DialogFragment \n2. For custom alert or other custom modals: use sendAccessibilityEvent as focused to move accessibility focus:\ntitleLabel?.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED)\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/alert-dialog\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityEvent#TYPE_VIEW_FOCUSED"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Screen readers can read content outside the modal dialog.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1. Use the native component AlertDialog or DialogFragment\n2. For custom alert or other custom modals:\n2.1 use sendAccessibilityEvent as focused to move accessibility focus to the modal:\nmodaltitleLabel?.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED) \n2.2. Use android:accessibilityTraversalAfter and android:accessibilityTraversalBefore to maintain focus within the modal dialogue.\n2.3. Use sendAccessibilityEvent as focused to move accessibility focus to the parent view:\nparentview?.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED)\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityEvent#TYPE_VIEW_FOCUSED\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalAfter\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalBefore"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "When the modal dialog, menu, or similar element is closed, screen reader focus is not returned to the triggering element.",
        "recommendation":  "Fix this issue by using the sendAccessibilityEvent to move the screen reader focus to the triggering component:\n\nUsing Java: \ntriggeringComponentObj?.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED)\nREFERENCE: \nDeque University:Google:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityEvent#TYPE_VIEW_FOCUSED"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Screen reader focus does not follow visual focus or move to the intended target, such as with a \"return to top\" control.",
        "recommendation":  "Fix this issue by using the sendAccessibilityEvent to move the screen reader focus to the top of screen:\n\nUsing Java: \ntopNavigationObject?.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED)\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityEvent#TYPE_VIEW_FOCUSED"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "Screen reader focus falls on an interactive element that is hidden or empty.",
        "recommendation":  "Fix this issue by removing the element from assistive technology users experience, implement importantForAccessibility property to hide the content. Use ONE of the following techniques:\n\n1. Using XML:\nandroid:importantForAccessibility=\"no\"\n\n2. Using Java:\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO);\n\nOR\n\n \nFix this issue by adding the element from assistive technology users experience, implement importantForAccessibility property to visible the content. Use ONE of the following techniques: \n\n1. Using XML: \nandroid:importantForAccessibility=“yes” \n\n2. Using Java: \nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES); \nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.2.a",
        "issueDescription":  "The correct reading order of dynamically changed content is not programmatically determinable by screen readers.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1. Ensure that added or updated content is, below the element or event that triggered the change.\n\n2. Thoughtfully manage programmatic focus within the workflow so screen reader users are made aware of new or updated content without disrupting the user\u0027s overall workflow / reading order. This can be done by ensuring that the reading order of the content is logical. Use the accessibilityTraversalAfter or the accessibilityTraversalBefore property to set the reading order for the screen reader.\n\nUse ONE of the following techniques\n\n1. Using XML:\n\u003cTextView\nandroid:id=\"@+id/textView1\"\nandroid:text=\"Start Time\"/\u003e\n\u003cTextView\nandroid:id=\"@+id/textView2\"\nandroid:text=\"02: 30 PM\"\nandroid:accessibilityTraversalAfter=\"@id/textView1\"/\u003e\n\u003cTextView\nandroid:id=\"@+id/textView3\"\nandroid:text=\"End time\"\nandroid:accessibilityTraversalAfter=\"@id/textView2\"/\u003e\n\u003cTextView\nandroid:id=\"@+id/textView4\"\nandroid:text=\"06:30 PM\"\nandroid:accessibilityTraversalAfter=\"@id/textView3\"/\u003e\n\n2. Using Java:\nTextView starttimeL = findViewById(R.id.textView6);\nTextView starttimeV = findViewById(R.id.textView);\nstarttimeV.setAccessibilityTraversalAfter(starttimeL.getId());\nTextView endtimeL = findViewById(R.id.textView5);\nendtimeL.setAccessibilityTraversalAfter(starttimeV.getId());\nTextView endtimeV = findViewById(R.id.textView2);\nendtimeV.setAccessibilityTraversalAfter(endtimeL.getId());\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/structure/reading-order\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalAfter\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalBefore"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.3.a",
        "issueDescription":  "Instructions are presented in a way that requires the ability to see shape, color, size, visual location, or orientation.",
        "recommendation":  "Fix this issue by ensuring that instructions that refer to shape, color, size, position, or orientation also reference another non-visual characteristic - such as a text label - that can be accessed using assistive technology - such as a screen reader - and by people who cannot perceive color, shape or size etc."
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.3.a",
        "issueDescription":  "Instructions are presented in a way that requires the ability to see shape, color, size, visual location, or orientation.",
        "recommendation":  "Fix this issue by ensuring that instructions that refer to shape, color, size, position, or orientation also reference another non-visual characteristic - such as a text label - that can be accessed using assistive technology - such as a screen reader - and by people who cannot perceive color, shape or size etc."
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.3.a",
        "issueDescription":  "Instructions are presented in a way that requires the ability to see shape, color, size, visual location, or orientation.",
        "recommendation":  "Fix this issue by ensuring that instructions that refer to shape, color, size, position, or orientation also reference another non-visual characteristic - such as a text label - that can be accessed using assistive technology - such as a screen reader - and by people who cannot perceive color, shape or size etc."
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.3.b",
        "issueDescription":  "Information/instruction is presented in a way that requires the ability to hear sound, and there is no alternate method to convey the information.",
        "recommendation":  "Fix this issue by ensuring that instructions conveyed by audio cues are also available in text so people who are deaf or hard of hearing can still get the information or follow the instructions."
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.4.a",
        "issueDescription":  "When the page/app is opened, it is not presented in the device’s current display orientation.",
        "recommendation":  "Fix this issue by ensuring that the application does not restrict the screen to a particular display orientation. This can be accomplished by ensuring screenOrientation as fullsensor.\n\nUse ONE of the following techniques\n\n1. Using XML:\n\u003cactivity android:name=\".MainActivity\"\n          android:screenOrientation=\"fullSensor\"\u003e\n\u003c/activity\u003e         \n\n2. Using Java:\nYou can call the setRequestedOrientation() method in the onCreate() method of the Activity or at any other appropriate place in your code:\n        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR);\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/device-orientation\n\nGoogle:\nhttps://developer.android.com/guide/topics/manifest/activity-element.html#screen"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.4.a",
        "issueDescription":  "When the device is rotated, the content does not adjust to the new display orientation.",
        "recommendation":  "Fix this issue by ensuring that the application does not restrict the screen to a particular display orientation. This can be accomplished by ensuring screenOrientation as fullSensor.\n\nUse ONE of the following techniques\n\n1. Using XML:\n\u003cactivity android:name=\".MainActivity\"\n          android:screenOrientation=\"fullSensor\"\u003e\n\u003c/activity\u003e         \n\n2. Using Java:\nYou can call the setRequestedOrientation() method in the onCreate() method of the Activity or at any other appropriate place in your code:\n        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR);\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/device-orientation\n\nGoogle:\nhttps://developer.android.com/guide/topics/manifest/activity-element.html#screen"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.3.4.a",
        "issueDescription":  "The presentation of the content adjusts when the device\u0027s display orientation changes, but some functionality or content is inaccessible.",
        "recommendation":  "Fix this issue by ensuring that all the functionality or content is accessible to a particular display orientation. This can be accomplished by ensuring screenOrientation as fullSensor.\n\nUse ONE of the following techniques\n\n1. Using XML:\n\u003cactivity android:name=\".MainActivity\"\n          android:screenOrientation=\"fullSensor\"\u003e\n\u003c/activity\u003e         \n\n2. Using Java:\nYou can call the setRequestedOrientation() method in the onCreate() method of the Activity or at any other appropriate place in your code:\n        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR);\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/device-orientation\n\nGoogle:\nhttps://developer.android.com/guide/topics/manifest/activity-element.html#screen"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.1.a",
        "issueDescription":  "Color is used as the sole method to identify error(s) on form field(s).",
        "recommendation":  "Error identification must not rely on color alone, such as only outlining the field in red or changing the field label to red, to communicate the error.\n\nFix this issue by using ONE or BOTH of the following techniques:\n1. Provide a list of error messages that include the field name at the top of the screen.\n2. Provide an inline form error message that includes the field name or is associated with the field or both.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/color-as-information"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.1.a",
        "issueDescription":  "Color is used to convey information that is not conveyed in any other way.",
        "recommendation":  "Fix this issue by doing ALL of the following:\n1. Provide a visually redundant method of communicating the same information as is conveyed by colors such as real onscreen text, an icon, patterns, or a contrast ratio between components greater than 3.0 to 1.\n2. Provide a screen reader accessible (programmatically-discernable) method of conveying the same information as is conveyed by color such as real onscreen text, screen reader accessible alternative text.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/color-as-information"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.1.a",
        "issueDescription":  "A change in color is used to visually convey the state of a control, and the contrast difference between the states is less than 3:1.",
        "recommendation":  "Fix this issue by adjusting the state indicator (e.g. selected, on etc) color of the user interface component and/or background to increase the contrast to at least 3 to 1."
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.1.b",
        "issueDescription":  "Link text and static text are differentiated only by color. The contrast ratio between default link text and surrounding text is not at least 3:1.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1. Leave the link text and body text in contrast as-is, but add an additional indicator (e.g. underline, outline, etc.) to the link text when it is in its default state.\n2. Increase the contrast between the link text and the body text so that the ratio is at least 3.0 to 1.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.2.a",
        "issueDescription":  "Audio starts playing automatically, lasts more than 3 seconds, and does not have an accessible mechanism to stop, pause, mute or adjust the volume of the audio.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1. Only start audio with an action initiated by the user (strongly preferred).\n2. Stop the auto-playing audio within 3 seconds.\n3. Provide an easily located, accessible mechanism to stop, pause, mute, or adjust volume for audio that automatically plays for more than 3 seconds."
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.3.a",
        "issueDescription":  "The contrast ratio between text and its background is not at least 4.5:1.",
        "recommendation":  "Fix this issue by adjusting the text color and/or background color to increase the contrast to at least 4.5 to 1.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.3.a",
        "issueDescription":  "All or portions of text over an image do not meet the minimum 4.5:1 contrast requirement.",
        "recommendation":  "Fix this issue by adjusting the text and/or background color to increase the contrast to at least 4.5 to 1. Common techniques include:\n1. Applying an opaque or semi-opaque background behind the text.\n2. Lighten or darken part or all of the image to increase the overall contrast between the text and the image.\n3. Use a border around the letters to create sufficient contrast.\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.3.a",
        "issueDescription":  "The contrast ratio between placeholder text and its background is not at least 4.5:1.",
        "recommendation":  "Fix this issue by adjusting the text color and/or background color to increase the contrast to at least 4.5 to 1.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.3.b",
        "issueDescription":  "The contrast ratio between large text and its background is not at least 3:1.",
        "recommendation":  "Fix this issue by adjusting the large text color and/or background color to increase the contrast to at least 3 to 1.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.3.b",
        "issueDescription":  "All or portions of large text over an image do not meet the minimum 3:1 contrast requirement.",
        "recommendation":  "Fix this issue by adjusting the text color and/or background color to increase the contrast to at least 3 to 1. Common techniques include:\n1. Applying an opaque or semi-opaque background behind the text.\n2. Lighten or darken part or all of the image to increase the overall contrast between the text and the image.\n3. Use a border around the letters to create sufficient contrast.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.3.b",
        "issueDescription":  "The contrast ratio between large placeholder text and its background is not at least 3:1.",
        "recommendation":  "Fix this issue by adjusting the large placeholder text color and/or background color to increase the contrast to at least 3 to 1.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.4.a",
        "issueDescription":  "NOT CURRENTLY APPLICABLE TO NATIVE TESTING:\r\n\r\nFont size does not respond to resizing from Accessibility Settings",
        "recommendation":  "Fix this issue by updating the textSize in SP(Scale-Independant Pixels or Scaleable Pixels) type.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:textSize=\"24sp\"\n\n2. Using Java:\ntextLabel.setTextSize(TypedValue.COMPLEX_UNIT_SP, 24);\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/text/text-resize"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.4.a",
        "issueDescription":  "NOT CURRENTLY APPLICABLE TO NATIVE TESTING:\r\n\r\nContent is lost, clipped, or obscured when text is resized to Accessibility setting maximum.",
        "recommendation":  "Fix this issue by ensuring that view containers are flexible enough to accommodate resizing text up to 200% of it default without clipping, truncating, or obscuring text.\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/text/text-resize"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.4.a",
        "issueDescription":  "NOT CURRENTLY APPLICABLE TO NATIVE TESTING:\r\n\r\nFunctionality is lost when text is resized to Accessibility setting maximum.",
        "recommendation":  "Fix this issue by ensuring that when the screen is zoomed to 200%, the functionality is not hidden or obscured by the resizing of text containers or other content, and that no functionality is removed from the screen.\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/text/text-resize"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.5.a",
        "issueDescription":  "The image contains embedded text.",
        "recommendation":  "Fix this issue by using the real text to achieve the desired visual design.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/text/images-of-text"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.11.a",
        "issueDescription":  "The visual boundary of an active user interface component lacks 3 to 1 contrast ratio.",
        "recommendation":  "Fix this issue by adjusting the user interface component boundary and/or background color to increase the contrast with either the inner or outer adjacent background to at least 3 to 1.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/non-text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.11.b",
        "issueDescription":  "The state of an active component lacks 3 to 1 contrast ratio.",
        "recommendation":  "Fix this issue by adjusting the state indicator (e.g. selected, checked etc) color of the user interface component and/or background color, to increase the contrast to at least 3 to 1.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/non-text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.11.b",
        "issueDescription":  "Focus indicator lacks 3 to 1 contrast ratio.",
        "recommendation":  "Fix this issue by adjusting the visual focus indicator to achieve 3 to 1 contrast according the scenarios below.\n\nWhen a focus indicator appears:\n\n1. Outside the component, it needs to contrast with the background that the component is on.\n2. Inside the component, it needs to contrast with the adjacent color(s) within the component.\n3. As the border of the component (inside the component and adjacent to the outside), it needs to contrast with both adjacent colors.\n4. Appears partly inside and partly outside, either part of the focus indicator can contrast with the adjacent colors.\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/non-text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.11.c",
        "issueDescription":  "Parts of graphics (required to understand the content) do not have a contrast ratio of 3 to 1 against adjacent color(s).",
        "recommendation":  "Fix this issue by adjusting the graphical component color and/or background color to increase the contrast to at least 3 to 1.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/non-text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "1.4.11.c",
        "issueDescription":  "Parts of an icon (with no text) do not have a contrast ratio of 3 to 1 against adjacent color(s). These icon parts are required for understanding.",
        "recommendation":  "Fix this issue by adjusting the icon color and/or background color to increase the contrast to at least 3 to 1.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/color-contrast/non-text-contrast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed with a screen reader turned on.",
        "recommendation":  "Fix this issue by making sure the interactive component is enabled.\nNote: If the component is not focusable by the screen reader, enable the importantForAccessibility property to yes.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:enabled=\"true\"\nandroid:importantForAccessibility=\"yes\"\n\n2. Using Java:\nbuttonUnSubscribe.setEnabled(true);\nbuttonUnSubscribe.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\n\nNote: For any gesture-based interactions, use the ViewCompat.addAccessibilityAction API to add  gesture-based actions as custom actions for interactive controls\n ViewCompat.addAccessibilityAction(object, \"Custom Action Name\", (viewObj, args) -\u003e {\n            Toast.makeText(getContext(), \"Custom Action\", Toast.LENGTH_SHORT).show();\n            return  true;\n        });\n\nREFERENCE: \nGoogle:\n\nhttps://developer.android.com/reference/android/view/View.html#isEnabled()\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility\n\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#accessibility-actions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed with a screen reader turned on.",
        "recommendation":  "Fix this issue by using the importantForAccessibility property to make the interactive component available for the screen reader. Make sure the interactive component is enabled, by updating the enabled property as true for the component.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:enabled=\"true\"\nandroid:importantForAccessibility=\"yes\"\n\n2. Using Java:\nviewObj.setEnabled(true);\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#isEnabled()\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed using Switch Access.",
        "recommendation":  "Fix this issue by using the importantForAccessibility property to make the interactive component available for the screen reader. Make sure the interactive component is enabled, by updating the enabled property as true for the component.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:enabled=\"true\"\nandroid:importantForAccessibility=\"yes\"\n\n2. Using Java:\nviewObj.setEnabled(true);\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#isEnabled()\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed using Switch Access.",
        "recommendation":  "Fix this issue by using the importantForAccessibility property to make the interactive component available for the screen reader. Make sure the interactive component is enabled, by updating the enabled property as true for the component.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:enabled=\"true\"\nandroid:importantForAccessibility=\"yes\"\n\n2. Using Java:\nviewObj.setEnabled(true);\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#isEnabled()\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed using Switch Access. [USER AGENT ISSUE]",
        "recommendation":  "Fix this issue by using the importantForAccessibility property to make the interactive component available for the screen reader. Make sure the interactive component is enabled, by updating the enabled property as true for the component.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:enabled=\"true\"\nandroid:importantForAccessibility=\"yes\"\n\n2. Using Java:\nviewObj.setEnabled(true);\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#isEnabled()\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.1.a",
        "issueDescription":  "Action cannot be performed with Voice Access on.",
        "recommendation":  "Fix this issue by using the importantForAccessibility property to make the interactive component available for the screen reader. Make sure the interactive component is enabled, by updating the enabled property as true for the component.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:enabled=\"true\"\nandroid:importantForAccessibility=\"yes\"\n\n2. Using Java:\nviewObj.setEnabled(true);\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#isEnabled()\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.1.c",
        "issueDescription":  "Custom gesture is not accessible when the screen reader is turned on.",
        "recommendation":  "Fix this issue by ensuring that there are alternative methods to perform all gesture-based actions, for example: previous and next arrow buttons or custom actions to advance a carousel in addition to swiping left and right. Use the ViewCompat.addAccessibilityAction API to add custom actions for interactive controls\n \nUsing Java:\n ViewCompat.addAccessibilityAction(object, \"Gesture Name\", (viewObj, args) -\u003e {\n            //Gesture Action\n            ...\n            return  true;\n        });\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#accessibility-actions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.2.a",
        "issueDescription":  "Switch Access focus is trapped in a control.",
        "recommendation":  "Fix this issue by understanding where the Switch Access focus trap is occurring and using a technique such as:\n1. Make sure the way to navigate through a particular section of the screen (usually Switch Access navigation) can move past that section.\n2. Make sure the UI content following the above section, is exposed via accessibility services are implemented, using enabled property true.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:enabled=\"true\"\n\n2. Using Java:\nviewObj.setEnabled(true);\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View#setEnabled(boolean)"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.2.a",
        "issueDescription":  "The dialog cannot be dismissed using Switch Access",
        "recommendation":  "Fix this issue by doing at least ONE of the following:\n1.\tEnsure by implementing the standard AlertDialog or DialogFragment with interactive actions.\n2.\tFor custom alert or other custom modals: Fix this issue by using the importantForAccessibility property to make the interactive component available for the screen reader. Make sure the interactive component is enabled, by updating the enabled property as true for the component. Use ONE of the following techniques:\n2.1\tUsing XML:\nandroid:enabled=\"true\"\nandroid:importantForAccessibility=\"yes\"\n2.2\tUsing Java:\nviewObj.setEnabled(true);\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/alert-dialog\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityEvent#TYPE_VIEW_FOCUSED\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalAfter\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalBefore"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.2.a",
        "issueDescription":  "Screen reader focus is trapped in an element",
        "recommendation":  "Fix this issue by understanding where the screenreader focus trap is occurring and using a technique such as:\n1. Make sure the way to navigate through a particular section of the screen (usually screen reader navigation) can move past that section.\n2. Make sure the UI content following the above section, is exposed via accessibility services are implemented using enabled property true.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:enabled=\"true\"\n\n2. Using Java:\nviewObj.setEnabled(true);\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View#setEnabled(boolean)"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.1.2.a",
        "issueDescription":  "The dialog cannot be dismissed when the screen reader is turned on",
        "recommendation":  "Fix this issue by doing at least ONE of the following:\n1.\tEnsure by implementing the standard AlertDialog or DialogFragment with interactive actions.\n2.\tFor custom alert or other custom modals: Fix this issue by using the importantForAccessibility property to make the interactive component available for the screen reader. Make sure the interactive component is enabled, by updating the enabled property as true for the component. Use ONE of the following techniques:\n2.1\tUsing XML:\nandroid:enabled=\"true\"\nandroid:importantForAccessibility=\"yes\"\n2.2\tUsing Java:\nviewObj.setEnabled(true);\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/alert-dialog\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityEvent#TYPE_VIEW_FOCUSED\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalAfter\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalBefore"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.1 a",
        "issueDescription":  "Content visually appears for a short time and then disappears. The user has no way to adjust when the content visually appears or disappears. Examples of content include error messages, success messages, and updating headlines.",
        "recommendation":  "Fix this issue by doing ONE of the following:\n1. Leave the content on the screen until dismissed by the user.\n2. Allow the user to adjust the amount of time temporary content is displayed on the screen, up to 10 times the default.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/\n\nGoogle:\nhttps://developer.android.com/reference/android/app/AlertDialog"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.1 a",
        "issueDescription":  "Content times out without providing any warning to the user.",
        "recommendation":  "Fix this issue by providing an accessible warning of the timeout and an accessible mechanism to do ONE of the following:\n1. Turn off: Allow the user to turn off the time limit before encountering it.\n2. Adjust: Allow the user to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting.\n3. Extend: Warn the user before time expires, give the user at least 20 seconds to extend the time limit with a simple action (for example, \"press the button\"), and allow the user to extend the time limit at least ten times.\n\nFor example - code snippet for alert representation\n\nUsing Java:\nAlertDialog.Builder alertBuilderObj = new AlertDialog.Builder(MainActivity.this);\n        alertBuilderObj.setMessage(\"Session Timeout. Logout or try again\");\n        alertBuilderObj.setTitle(\"Timeout\");\n        alertBuilderObj.setCancelable(false);\n        alertBuilderObj.setPositiveButton(\"Okay\", (DialogInterface.OnClickListener) (dialog, which) -\u003e {\n            ...\n        });\n        AlertDialog alertDialog = alertBuilderObj.create();\n        alertDialog.show();\n\nRepresent any notification or warning actions to the user to increase or disable the timer.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/\n\nGoogle:\nhttps://developer.android.com/reference/android/app/AlertDialog"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.1 a",
        "issueDescription":  "The timeout warning does not provide a way to turn off the time limit or to adjust or extend the limit at least 10 times.",
        "recommendation":  "Fix this issue by providing an accessible warning of the timeout and an accessible mechanism to do ONE of the following:\n1. Turn off: Allow the user to turn off the time limit before encountering it.\n2. Adjust: Allow the user to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting.\n3. Extend: Warn the user before time expires, give the user at least 20 seconds to extend the time limit with a simple action (for example, \"activate a button\"), and allow the user to extend the time limit at least ten times.\n\nFor example - code snippet for alert representation\n\nUsing Java:\n AlertDialog.Builder alertBuilderObj = new AlertDialog.Builder(MainActivity.this);\n        alertBuilderObj.setMessage(\"Session will timeout in 30 seconds, want to Extend?\");\n        alertBuilderObj.setTitle(\"Timeout\");\n        alertBuilderObj.setCancelable(false);\n        alertBuilderObj.setPositiveButton(\"Okay\", (DialogInterface.OnClickListener) (dialog, which) -\u003e {\n           ....\n        });\n        alertBuilderObj.setNegativeButton(\"Extend\", (DialogInterface.OnClickListener) (dialog, which) -\u003e {\n            ....\n        });\n        AlertDialog alertDialog = alertBuilderObj.create();\n        alertDialog.show();\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/\n\nhttps://dequeuniversity.com/class/mobile-android-techniques/announcements/toasts\n\nGoogle:\nhttps://developer.android.com/reference/android/app/AlertDialog\n\nhttps://developer.android.com/reference/android/widget/Toast#makeText(android.content.Context,%20java.lang.CharSequence,%20int)\n\nhttps://developer.android.com/reference/com/google/android/material/snackbar/Snackbar#make(android.content.Context,%20android.view.View,%20java.lang.CharSequence,%20int)"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.1 a",
        "issueDescription":  "Screen reader users are not made aware of the presence of the time out warning.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1.        Implement pop-up message or notification using Android announceForAccessibility property.\n2.        Implement pop-up message or notification using Android Snackbar component.\n3.        Implement pop-up message or notification using Android Toast component.\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/announcements/toasts\n\nhttps://dequeuniversity.com/class/mobile-android-techniques/announcements/accessibility-announcements\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View#announceForAccessibility(java.lang.CharSequence)\n\nhttps://developer.android.com/reference/com/google/android/material/snackbar/Snackbar\n\nhttps://developer.android.com/reference/android/widget/Toast"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.1 a",
        "issueDescription":  "The mechanism to extend the session is not accessible by a screen reader.",
        "recommendation":  "Fix this issue by ensuring the time extension option is screen reader accessible.\n\nUsing Java:\n view.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\n view.setContentDescription(\"Extend\");\n view.setOnClickListener(new View.OnClickListener() {\n                @Override\n                public void onClick(View v) {\n               ...   \n                }\n            });\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.1 a",
        "issueDescription":  "The mechanism to extend the session is not accessible by Switch Access.",
        "recommendation":  "Fix this issue by ensuring the time extension option is Switch Access accessible.\n\nUsing Java:\n view.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\n view.setContentDescription(\"Extend\");\n view.setOnClickListener(new View.OnClickListener() {\n                @Override\n                public void onClick(View v) {\n                ...    \n                }\n            });\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.2.a",
        "issueDescription":  "Auto-playing media or animation has no mechanism to pause, stop, or hide the content.",
        "recommendation":  "Fix this issue by providing an accessible mechanism to pause the auto-updating content or to change the frequency with which content is updated.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/custom-controls/carousel"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.2.a",
        "issueDescription":  "Moving or blinking content that lasts more than 5 seconds does not have a mechanism to pause, stop or hide it.",
        "recommendation":  "Fix this issue by providing an accessible mechanism to pause, stop, or hide the blinking or moving content.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/custom-controls/carousel"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.2. b",
        "issueDescription":  "Automatically updating content does not have a mechanism to pause, stop, hide, or control the timing of the updates.",
        "recommendation":  "Fix this issue by providing an accessible mechanism to pause or hide the auto-updating content or to control the frequency with which content is updated.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/custom-controls/carousel"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.2.2. b",
        "issueDescription":  "The carousel does not have a mechanism to pause, stop, or control the changing content.",
        "recommendation":  "Fix this issue by providing an accessible mechanism to pause and resume carousel slides or to change the frequency with which the slides change.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/custom-controls/carousel"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.3.1.a",
        "issueDescription":  "Content flashes more than 3 times per second and exceeds 25% of 10 degrees of visual field in area.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1. Ensure that no content on the screen flashes more than 3 times per second.\n2. Ensure that content that flashes more than 3 times per second is sufficiently small: smaller than a contiguous area of 21,824 sq pixels (any shape).\n3. Ensure that content that flashes more than 3 times per second has a low enough contrast."
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.4.3.a",
        "issueDescription":  "Switch Access focus is not maintained within the modal. Switch Access users can access content behind the modal dialog.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n\n1. Ensure by implementing the standard AlertDialog or DialogFragment with interactive actions \n2. For custom alert or other custom modals:\n2.1 Use sendAccessibilityEvent as focused to move accessibility focus to the modal:\nmodaltitleLabel?.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED) \n2.2. Use android:accessibilityTraversalAfter and android:accessibilityTraversalBefore to maintain focus within the modal dialogue.\n2.3. Use sendAccessibilityEvent as focused to move accessibility focus to the parent view:\nparentview?.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED)\n\nREFERENCE: \n\nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/modal-dialog\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityEvent#TYPE_VIEW_FOCUSED\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalAfter\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:accessibilityTraversalBefore"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.4.3.a",
        "issueDescription":  "Switch Access focus falls on an element that is hidden or empty.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n\n1. If the control should not be visible or focusable then remove it for all users, using the importantForAccessibility property. Use ONE of the following techniques\n1.1. Using XML:\nandroid:importantForAccessibility=\"no\"\n1.2. Using Java:\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO);\n\n2. If the control is meant to be visible but not interactive, make it visible and don\u0027t implement onClick events for that.\n\n3. If the control is meant to be visible and interactive, then ensure that it is both focusable and visible to all users using techniques such as android:importantForAccessibility=\"Yes\" and android:visibility=\"visible\"\n \nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/modal-dialog\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.4.6.a",
        "issueDescription":  "The heading does not describe the topic or purpose of the content that follows it.",
        "recommendation":  "Fix this issue by providing headings that are clear, informative, and descriptive of the content that follows. Use ONE of the following techniques\n1. Using XML:\nandroid:text=\"Describe the header\" OR android:contentDescription=\"Describe the header\"\n\n2. Using Java:\nviewObj.setText(\"Describe the header\"); OR viewObj.setContentDescription(\"Describe the header\");\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/structure/headings\n\nGoogle:\nhttps://developer.android.com/reference/android/widget/TextView#setText(java.lang.CharSequence)\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.4.6.b",
        "issueDescription":  "The label does not convey the purpose of the control.",
        "recommendation":  "Fix this issue by providing a descriptive label for the control. Use the contentDescription property to define the interactive component label that describes the action of the control.\n\nUse ONE of the following techniques\n\n1. Using XML:\nandroid:contentDescription=\"Details of element action \"\n\n2. Using Java:\nviewObj.setContentDescription(\"Details of element action \");\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.4.6.b",
        "issueDescription":  "Multiple controls have the same labels/names but perform different actions. This is not conveyed via text associated with individual controls.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1. Use the contentDescription property to provide a complete programmatic label for the button.\n\n1.1. Using XML:\nandroid:contentDescription=\"Class A: House training your puppy\"\nOR\n1.2. Using Java:\nviewObj.setContentDescription(\"Class A: House training your puppy\");\n\n2. For more than one interactive component performing the same function, use the contentDescription property to associate visible text with the button to provide a complete description of the button\u0027s purpose.\n\n2.1. Using XML:\nandroid:contentDescription=\"Register for Class A: House training your puppy\"\nOR\n2.2. Using Java:\nviewObj.setContentDescription(\"Register for Class A: House training your puppy\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.4.6.b",
        "issueDescription":  "The programmatic label does not convey the purpose of the control. The programmatic label and visual label do not convey consistent information.",
        "recommendation":  "Fix this issue by ensuring that the programmatic label for the control correctly conveys the purpose of the control. Generally, the programmatic label and the visual label should match. \n\nIf the control is a form field then use the labelfor property to match the programmatic label with the visible label. Use ONE of the following techniques:\n\n1. Using XML: \n\u003cTextView \n... \nandroid:labelFor=\"@id/edittext_second\"/\u003e \n\u003cEditText\n… \nandroid:id=\"@+id/edittext_second\" \n\u003c/EditText\u003e\n\n2. Using Java:\nmyLabel.setLabelFor(myInput.getId());\n\nIf the control is not a form field use the contentDescription property to update the purpose of the control. Use ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\" match the visible label value\"\n2. Using Java:\nviewObj.setContentDescription(\"match the visible label value\");\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/labels\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription\n\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#editable"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.4.6.b",
        "issueDescription":  "The visible label does not convey the purpose of the control. The programmatic label and visual label do not convey consistent information.",
        "recommendation":  "Fix this issue by ensuring that the programmatic label for the control correctly conveys the purpose of the control. Generally, the programmatic label and the visual label should match. \n\nIf the control is a form field then use the labelfor property to match the programmatic label with the visible label. Use ONE of the following techniques:\n\n1. Using XML: \n\u003cTextView \n... \nandroid:labelFor=\"@id/edittext_second\"/\u003e \n\u003cEditText\n… \nandroid:id=\"@+id/edittext_second\"\n\u003c/EditText\u003e\n\n2. Using Java:\nmyLabel.setLabelFor(myInput.getId());\n\nIf the control is not a form field use the contentDescription property to update the purpose of the control. Use ONE of the following techniques:\n\n1. Using XML:\nandroid:contentDescription=\"match the visible label value\"\n2. Using Java:\nviewObj.setContentDescription(\"match the visible label value\");\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/labels\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription\n\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#editable"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.4.11.a",
        "issueDescription":  "The focused element is completely covered by other author-created content. (Keyboard user experience)",
        "recommendation":  "For content such as sticky headers, sticky footers, cookie consent banners, etc:\n1. Make sure sticky headers or sticky footers do not obscure the focused item when tabbing forward or backward through the page.\n\nFor overlays such as non-modal dialogs, tooltips, submenus, chat widgets, message panels, etc. that are opened and closed BY THE USER (e.g. by using the Spacebar or Enter key or when tabbed to):\n1. Position the popup so it does not cover other focusable content OR \n2. Make the content modal and move focus to it and trap focus in it OR \n3. Close the content when focus leaves it OR \n4. Provide a way for the user to close the overlay content (e.g. the ESC key) while focus is on an item behind the overlay.\n\nFor overlays such as non-modal dialogs, popups, submenus, chat widgets, message panels, etc. that open AUTOMATICALLY:\n1. Position the popup so it does not cover other focusable content OR \n2. Make the content modal and move focus to it and trap focus in it OR \n3. Don’t open the content automatically. Allow the user to open and close it and follow the recommendations for user-controlled content above.\n\nFor content such as modal dialogs that don’t automatically get and trap focus when opened:\n1. Move focus to the modal dialog and trap focus inside it.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.4.11.a",
        "issueDescription":  "The focused element is completely covered by other author-created content. (Switch Access user experience)",
        "recommendation":  "For content such as sticky headers, sticky footers, cookie consent banners, etc:\n1. Make sure sticky headers or sticky footers do not obscure the focused item when navigating forward or backward through the page.\n\nFor overlays such as non-modal dialogs, tooltips, submenus, chat widgets, message panels, etc. that are opened and closed BY THE USER (e.g. by using the Switch Access):\n1. Position the popup so it does not cover other focusable content OR \n2. Make the content modal and move focus to it and trap focus in it OR \n3. Close the content when focus leaves it OR\n4. Switch Access user can use Android device hardware back button to Close the content\n\nFor overlays such as non-modal dialogs, popups, submenus, chat widgets, message panels, etc. that open AUTOMATICALLY:\n1. Position the popup so it does not cover other focusable content OR \n2. Make the content modal and move focus to it and trap focus in it OR \n3. Don’t open the content automatically. Allow the user to open and close it and follow the recommendations for user-controlled content above.\n\nFor content such as modal dialogs that don’t automatically get and trap focus when opened:\n1. Move focus to the modal dialog and trap focus inside it.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.1.a",
        "issueDescription":  "Functionality (excluding operating system, user agent or assistive technology functions) requires multipoint gestures.",
        "recommendation":  "Fix this issue by providing an alternative method to accomplish the same function that relies only on single-pointer actions that are not path-based. The alternative method can replace the current method or be an additional method. Examples of single-pointer activation on a touchscreen or touchpad include taps, double taps, long presses, dragging actions and custom actions that are not path-based. \nUse the ViewCompat.addAccessibilityAction API to add custom actions for interactive controls, and make sure the view is interactive for the screen reader using the Enabled property.\n \nUsing Java:\nview.setEnabled(true);\nviewObj.setContentDescription(\"Gesture Name\");\n ViewCompat.addAccessibilityAction(object, \"Gesture Name\", (viewObj, args) -\u003e {\n            //Gesture Action\n           ...\n            return  true;\n  });\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View#setEnabled(boolean)\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription\n\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#accessibility-actions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.1.a",
        "issueDescription":  "Functionality (excluding operating system, user agent or assistive technology functions) relies on path-based gestures.",
        "recommendation":  "Fix this issue by providing an alternative method to accomplish the same function that does not rely only on path-based pointer actions. The alternative method can replace the current method or be an additional method. Examples of path-based gestures include swiping, sliders and carousels dependent on the direction of interaction, and other gestures which trace a prescribed path such as drawing a specific shape. Such paths may be drawn with a finger or stylus on a touchscreen, graphics tablet, or trackpad, or with a mouse, joystick, or similar pointer device. The alternative method can replace the current method or be an additional method.\nUse the ViewCompat.addAccessibilityAction API to add custom actions for interactive controls, and make sure the view is interactive for the screen reader using the Enabled property.\n \nUsing Java:\nview.setEnabled(true);\nviewObj.setContentDescription(\"Gesture Name\");\n ViewCompat.addAccessibilityAction(object, \"Gesture Name\", (viewObj, args) -\u003e {\n            //Gesture Action\n           ...\n            return  true;\n  });\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View#setEnabled(boolean)\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription\n\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#accessibility-actions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.2.a",
        "issueDescription":  "Control submits an irreversible action on the down event.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n\n1. Use native interactive controls, such as buttons.\n2. Use a generic touch-up event.\n3. Provide an opportunity for the user to confirm or abort the action before completing it.\n4. Provide a mechanism to undo the action after it is completed."
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.3.a",
        "issueDescription":  "Accessible name contains the visible label text, but one or more other words is interspersed in the label",
        "recommendation":  "Fix this issue by ensuring that the accessible name - such as the contentDescription - contains the text of the visible label in the same order in which it appears and without words interspersed. While it is not necessary that the visible label and accessible name match exactly, it is a best practice to have the accessible name begin with the visible text.\n\nUse ONE of the following techniques\n \n1. Using XML:\nandroid:contentDescription=\"visible label + additional description\"\n\n2. Using Java:\nviewObj.setContentDescription(\"visible label + additional description\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.3.a",
        "issueDescription":  "Accessible name does not contain the visible label text.",
        "recommendation":  "Fix this issue by ensuring that the accessible name - such as the contentDescription - contains the text of the visible label in the same order in which it appears and without words interspersed. While it is not necessary that the visible label and accessible name match exactly, it is a best practice to have the accessible name begin with the visible text.\n\nUse ONE of the following techniques \n\n1. Using XML:\nandroid:contentDescription=\"visible label + additional description\"\n\n2. Using Java:\nviewObj.setContentDescription(\"visible label + additional description\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.3.a",
        "issueDescription":  "Accessible name contains the visible label text, but the words of the visible label are not in the same order as they are in the accessible name.",
        "recommendation":  "Fix this issue by ensuring that the accessible name - such as the contentDescription - contains the text of the visible label in the same order in which it appears and without words interspersed. While it is not necessary that the visible label and accessible name match exactly, it is a best practice to have the accessible name begin with the visible text.\n \nUse ONE of the following techniques\n\n1. Using XML:\nandroid:contentDescription=\"visible label + additional description\"\n\n2. Using Java:\nviewObj.setContentDescription(\"visible label + additional description\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.3.a",
        "issueDescription":  "",
        "recommendation":  "Fix this issue by implementing an associated visible label for the Text Field or Text View. Use ONE of the following techniques \n\n1. Ensure that the form field is programmatically associated with the label e.g. via the labelFor property.\n1.1 Using XML:\n\u003cTextView\n...\nandroid:labelFor=\"@id/edittext_second\"/\u003e\n\u003cEditText\nandroid:id=\"@+id/edittext_second\"\n....\n\u003cEditText\u003e\n1.2 Using Java:\nmyLabel.setLabelFor(myInput.getId());\n\n2. Ensure that the form field is implemented using TextInputLayout and programmatically associated with the visible label e.g. via the Hint property.\n2.1 Using XML:\n    \u003ccom.google.android.material.textfield.TextInputLayout\n        android:id=\"@+id/textInputLayout\"\n        …\u003e\n        \u003ccom.google.android.material.textfield.TextInputEditText\n            android:id=\"@+id/editTextLayout\"\n            android:hint=\"First Name\" \n        …/\u003e\n    \u003c/com.google.android.material.textfield.TextInputLayout\u003e\n2.2 Using Java:\neditTextLayout.setHint(\"First Name\");\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/labels\nGoogle:\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#editable\n\nhttps://developer.android.com/reference/com/google/android/material/textfield/TextInputLayout\n\nhttps://developer.android.com/reference/com/google/android/material/textfield/TextInputEditText"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.4.a",
        "issueDescription":  "Motion actuation cannot be disabled.",
        "recommendation":  "Fix this issue by providing a mechanism, such as an application setting, that turns off motion-actuated features."
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.4.a",
        "issueDescription":  "Motion actuation disrupts or disables system level features.",
        "recommendation":  "Fix this issue by ensuring that the application does not disrupt or disable system-level features which allow the user to disable motion actuation."
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.4.a",
        "issueDescription":  "Functionality can only be activated via motion actuation (such as shaking or tilting the device).",
        "recommendation":  "Fix this issue by ensuring that alternative means of input exist when using device motion sensor input to activate content functionality.\nUse the ViewCompat.addAccessibilityAction API to add custom actions for interactive controls, and make sure the view is interactive for the screen reader using the Enabled property.\n \nUsing Java:\n viewObj.setEnabled(true);\n ViewCompat.addAccessibilityAction(object, \"Gesture Name\", (viewObj, args) -\u003e {\n            Toast.makeText(getContext(), \"Gesture Action\", Toast.LENGTH_SHORT).show();\n            return  true;\n  });\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#accessibility-actions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.7.a",
        "issueDescription":  "Functionality requires a dragging movement and does not have a single-pointer, single-touch alternative.",
        "recommendation":  "Fix this issue by providing an alternative method to accomplish the same function that can be accomplished using single taps such as alternative input into a text field, or a tap to select and a tap to drop.\n\nThe alternative method can replace the current method or be an additional method.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.7.a",
        "issueDescription":  "Functionality requires a dragging movement and does not have a single-pointer, single-touch alternative.",
        "recommendation":  "Fix this issue by providing an alternative method to accomplish the same function that can be accomplished using single taps such as alternative input into a text field, or a tap to select and a tap to drop.\n\nThe alternative method can replace the current method or be an additional method.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements"
    },
    {
        "platform":  "Android",
        "checkpoint":  "2.5.8.a",
        "issueDescription":  "Target does not meet minimum 24 x 24 dp size or spacing.",
        "recommendation":  "Fix this issue by doing at least ONE of the following:\n\n1. Ensure that the control has a target size of at least 24 x 24 dp.\n2. Ensure that a 24 dp diameter circle centered on the target does not touch another target nor a 24 dp diameter circle placed on the center of any other adjacent targets that are less than 24 by 24 dp.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.2.1.a",
        "issueDescription":  "When screen reader focus falls on a component, focus is automatically removed or redirected.",
        "recommendation":  "Fix this issue by ensuring that focus is not moved to another component or removed altogether when a component receives screen reader focus."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.2.1.a",
        "issueDescription":  "When Switch Access focus lands on a component, focus is automatically removed or redirected.",
        "recommendation":  "Fix this issue by ensuring that focus is not moved to another component or removed altogether when a component receives Switch Access focus."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.2.1.a",
        "issueDescription":  "When screen reader focus falls on a component, there is a significant change of content (above the user\u0027s point of regard) that changes the meaning of the content.",
        "recommendation":  "Fix this issue by ensuring that when a screen component receives focus, it does not result in a change in context including:\n1) submitting a form automatically;\n2) launching a new screen;\n3) changing focus to another component when a component receives focus; or\n4) any other change that could confuse or disorient the user."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.2.1.a",
        "issueDescription":  "When Switch Access focus lands on a component, there is a significant change of content (above the user\u0027s point of regard) that changes the meaning of the content.",
        "recommendation":  "Fix this issue by ensuring that when a screen component receives focus, it does not result in a change in context including:\n1. submitting a form automatically;\n2. launching a new screen;\n3. changing focus to another component when a component receives focus; or\n4. any other change that could confuse or disorient the user."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.2.2.a",
        "issueDescription":  "A change of context occurs without warning when the user changes the setting of a user interface control.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n\n1. Ensure that entering text into a TextField or TextView, toggling a switch or selecting an item from a PickerView does not result in a substantial change in context including:\n1.1 submitting a form automatically\n1.2 navigating to the next screen\n1.3 additional keyboard focus changes\n1.4 any other change that could confuse or disorient the user.\n\n2. Inform users ahead of time of such behavior by methods such as the text label for the UI control or some advisory text placed before the control that cautions the user of this behavior."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.2.3.a",
        "issueDescription":  "Navigational elements that occur across multiple pages or screens are not presented in the same relative order.",
        "recommendation":  "Fix this issue by ensuring that navigation patterns that are repeated across screens are presented in the same relative order each time they appear throughout the site."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.2.4.a",
        "issueDescription":  "Components are labeled differently on different pages or screens, though they have the same function.",
        "recommendation":  "Fix this issue by ensuring that components that have the same functionality across multiple screens are labelled consistently. This requirement extends to both visible labels and non-visible labels (such as an contentDescription used on an icon or button)."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.2.6.a",
        "issueDescription":  "Help mechanism is not in a programmatically consistent location.",
        "recommendation":  "For screens/pages where a particular help mechanism is provided, make sure that it is in a consistent programmatic location on each of those screens/pages. Programmatic location can be thought of as in the same relative code order within a screen/page area such as the header or footer.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.1.b",
        "issueDescription":  "The form field with an error is not identified in text, or text alternative, or via programmatic association.",
        "recommendation":  "Fix this issue by doing ONE of the following: \n1. Programmatically associate the error message and the input field in error - typically declaring the layout property ids and connecting the visible label and the error message container. (STRONGLY PREFERRED) \n2. Include the field name in the error message.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/error-validation"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.1.b",
        "issueDescription":  "Error message cannot be read by screen readers.",
        "recommendation":  "Fix this issue by ensuring that the error message is not programmatically hidden or otherwise inaccessible.\n\nMake sure the error messages are accessible for the screen reader, use the importantForAccessibility property to make it accessible.\n\n1. Using XML:\nandroid:importantForAccessibility=\"yes\"\n\n2. Using Java:\nviewObj.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/error-validation\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:importantForAccessibility"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.1.b",
        "issueDescription":  "Input validation failures are not described in text or a text alternative.",
        "recommendation":  "Fix this issue by doing ALL of the following:\n1. Provide an error message in text format.\n2. * Include the field name in the error message and/or programmatically associate the error message and the input field in error - typically by implementing .setError method. \n3. Describe the reason for the error, being as specific as possible.\n\n* NOTE: Programmatic association of the error message and Text Field is STRONGLY recommended.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/error-validation"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.2.a",
        "issueDescription":  "No visual label is present and the purpose of this field is not clear without a visual label.",
        "recommendation":  "Fix this issue by using ONE of the following techniques, to ensure that the form field has a visible label and it is always visible:\n\n1. Ensure that the form field is programmatically associated with the label e.g. via the labelFor property.\n2. Ensure that the form field is implemented using TextInputLayout and programmatically associated with the visible label e.g. via the hint property.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/labels"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.2.a",
        "issueDescription":  "No visual label is present for a single select/picker item and the purpose of this field is not clear without a visual label.",
        "recommendation":  "Fix this issue by using ONE of the following techniques, to ensure that the form field has a visible label and it is always visible:\n\n1. Ensure that the form field is programmatically associated with the label e.g. via the labelFor property.\n2. Ensure that the form field is implemented using TextInputLayout and programmatically associated with the visible label e.g. via the hint property.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/labels"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.2.a",
        "issueDescription":  "No visual group label is present and the purpose of this group is not clear without a visual label.",
        "recommendation":  "Fix this issue by providing a visible group label for the set of form fields.\n\nEnsure that the group label is programmatically associated with the form fields via the contentDescription property. Note: If the UI is a radio buttons with a group label then implement the native RadioGroup with RadioButton component.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/group-labels\n\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/radio-buttons"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.2.a",
        "issueDescription":  "Label is not persistent. For example: placeholder is being used as the only visual label for a text field.",
        "recommendation":  "Fix this issue by ensuring that the form field has a visible label and it is always visible.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/labels"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.2.b",
        "issueDescription":  "Additional instructions are only provided for the input field to people who do not have disabilities. For a person with disabilities, the instructions are incomplete, inaccurate, or misleading.",
        "recommendation":  "Common solutions to fix this issue include:\n1. Provide essential instructions as text that is part of the field label.\n2. Provide essential instructions as text at the top of the form.\n3. Provide essential instructions as text before the intended field.\n4. Provide essential instructions when the field gains TalkBack focus via contentDescription by appending the label plus the instructions.\n5. Provide essential instructions as part of an accessible error message after the field input is validated.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/input-instructions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.2.b",
        "issueDescription":  "Additional instructions are needed for the input field but are not provided for people with disabilities. People without disabilities have access to additional instructions.",
        "recommendation":  "Common solutions to fix this issue include:\n1. Provide essential instructions as text that is part of the field label.\n2. Provide essential instructions as text at the top of the form.\n3. Provide essential instructions as text before the intended field.\n4. Provide essential instructions when the field gains TalkBack focus via contentDescription by appending the label plus the instructions.\n5. Provide essential instructions as part of an accessible error message after the field input is validated.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/input-instructions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.2.c",
        "issueDescription":  "The required field is not identified by any of the following means: its label or form-level instructions or an error message.",
        "recommendation":  "Fix this issue by using ONE OR MORE of the following techniques:\n1. Use the field label to indicate in text that it is a required field.\n2. Provide text instructions at the beginning of the form or set of fields that describe which fields are required (or optional).\n3. Provide an error message that indicates the required field(s) that was/were not completed.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/input-instructions"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.3.a",
        "issueDescription":  "The error message does not indicate expected data format.",
        "recommendation":  "Fix this issue by providing the required data format in the error message, \nfor example: \"Enter the expiration date in format MM/YYYY\"\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/error-validation"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.3.a",
        "issueDescription":  "The error message does not indicate expected range of data values.",
        "recommendation":  "Fix this issue by identifying the data range that is allowed for the form field in the error message.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/error-validation"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.3.a",
        "issueDescription":  "There is no suggestion for how to fix a validation failure.",
        "recommendation":  "Fix this issue by identifying the reason for the error, for example:\nAn expiration date entry fails validation. Instead of a generic message such as \"Expiration date is not valid\", provide specific feedback as to what went wrong:\n1. If the entered date failed because the format was not valid, the message could say \"Enter the expiration date in mm/yyyy format\"\n2. If the entered date failed because the time frame was not valid, the message could say \"Expiration date must not be in the past\"\n3. If the entered date failed because invalid characters were entered, the message could say \"Expiration date must only contain numbers\"\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/error-validation"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.4.a",
        "issueDescription":  "The \"Delete\"/\"Cancel\" button immediately triggers the deletion of the legal, financial, or data transaction on the database. Users do not have the ability to recover from an accidental deletion.",
        "recommendation":  "Fix this issue by using AT LEAST ONE of the following techniques:\n1. Allow the user to confirm the deletion before it takes place.\n2. Allow the user to reverse the deletion request after it has been submitted."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.4.a",
        "issueDescription":  "Users are not given the opportunity to review and edit information before the data is submitted.",
        "recommendation":  "Fix this issue by allowing the user to review and edit the information or answer(s) before submission."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.4.a",
        "issueDescription":  "User does not get an opportunity to review and confirm the transaction before committing it. Nor is the action reversible.",
        "recommendation":  "Fix this issue by using AT LEAST ONE of the following techniques:\n1. Allow the user to review and edit the transaction data before it is submitted.\n2. Allow the user to reverse the transaction after it has been submitted."
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.7.a",
        "issueDescription":  "Process requires a user to re-enter information.",
        "recommendation":  "Fix this issue by ensuring that throughout the process, the user is not asked to enter the same data twice. If data needs to be repeated in different steps of the process, options to satisfy the requirement include techniques such as:\n\na. Auto-populating the data\nb. Allowing selection of data in a dropdown\nc. Allowing text on the same screen to be copied and pasted\nd. Providing a checkbox to populate inputs with the same values as previously entered (e.g., my billing address is the same as my shipping address)\n\nThis Success Criterion does not require the web content / application to remember user information between sessions. However, when a process can run across different domains, such as a check-out process that includes a 3rd party payment provider, users must not be required to enter data twice even across domains that are part of the same process.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry"
    },
    {
        "platform":  "Android",
        "checkpoint":  "3.3.8.a",
        "issueDescription":  "Authentication process requires the completion of a non-exempted cognitive function test and no mechanism is available to assist the user in completing the cognitive function test.",
        "recommendation":  "Fix this issue by ensuring that no step in the authentication process relies only on the completion of a cognitive function test without a mechanism to assist the user in completing the cognitive function test.\n\nREFERENCE: \nWCAG Understanding document: https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control is missing an accessible name/label.",
        "recommendation":  "Fix this issue by using the contentDescription for controls with the corresponding actions. \n\nUse ONE of the following techniques \n \n1. Using XML:\nandroid:contentDescription=\"Define Control purpose\"\n\n2. Using Java:\nviewObj.setContentDescription(\"Define Control purpose\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control is missing a role.",
        "recommendation":  "Fix this issue by using ONE of the following techniques \n1.        Use native controls (comes with default accessible role)\n2.        Use the AccessibilityNodeInfoCompat property to convey the custom role.\n2.1 Using JAVA: AccessibilityNodeInfoCompat\nViewCompat.setAccessibilityDelegate(checkBoxObj, new AccessibilityDelegateCompat() {\n@Override\npublic void onInitializeAccessibilityNodeInfo(@NonNull View host, @NonNull AccessibilityNodeInfoCompat info) {\nsuper.onInitializeAccessibilityNodeInfo(host, info);\ninfo.setRoleDescription(\"[ROLE]\");\n}\n});\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.AccessibilityDelegate"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control is missing both a role and an accessible name/label.",
        "recommendation":  "Fix this issue by updating the text property or the contentDescription property for the button, to convey the purpose or function of the button. Update the clickable property as true for interactive elements which helps TalkBack to announce as \"\"Double-tap to active.\"\" \n\nUse ONE of the following techniques \n\n1. Using XML\nandroid:clickable=\"true\"\nandroid:text=\"Send me Email on existing offer\"\nOR\nandroid:clickable=\"true\"\nandroid:contentDescription=\"Send me Email on existing offer.\"\n\n2. Using Java:\nbtnTextView.setText(\"Send me Email on existing offer.\");\nOR\nbtnTextView.setContentDescription(\"Send me Email on existing offer.\");\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/buttons\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription\n\nhttps://developer.android.com/reference/android/view/View#attr_android:clickable"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Form control is not associated with its visible label",
        "recommendation":  "Fix this issue by implementing an associated visible label for the Text Field or Text View. Use ONE of the following techniques \n\n1. Ensure that the form field is programmatically associated with the label e.g. via the labelFor property.\n1.1 Using XML:\n\u003cTextView\n...\nandroid:labelFor=\"@id/edittext_second\"/\u003e\n\u003cEditText\nandroid:id=\"@+id/edittext_second\"\n....\n\u003cEditText\u003e\n1.2 Using Java:\nmyLabel.setLabelFor(myInput.getId());\n\n2. Ensure that the form field is implemented using TextInputLayout and programmatically associated with the visible label e.g. via the Hint property.\n2.1 Using XML:\n    \u003ccom.google.android.material.textfield.TextInputLayout\n        android:id=\"@+id/textInputLayout\"\n        …\u003e\n        \u003ccom.google.android.material.textfield.TextInputEditText\n            android:id=\"@+id/editTextLayout\"\n            android:hint=\"First Name\" \n        …/\u003e\n    \u003c/com.google.android.material.textfield.TextInputLayout\u003e\n2.2 Using Java:\neditTextLayout.setHint(\"First Name\");\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/labels\nGoogle:\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#editable\n\nhttps://developer.android.com/reference/com/google/android/material/textfield/TextInputLayout\n\nhttps://developer.android.com/reference/com/google/android/material/textfield/TextInputEditText"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Checkbox is not programmatically associated with its visible label.",
        "recommendation":  "Fix this issue by implementing an associated visible label for the CheckBox using the Text property or using the labelFor property. \n\n1. Using Text property\nUse ONE of the following techniques \n1.1. Using XML:\n\u003cCheckBox\n        android:id=\"@+id/rcheckboxbtnExample\"\n        android:checked=\"true\"\n        android:text=\"Terms And Conditions\"/\u003e\n1.2. Using JAVA:\n rcheckboxbtnExample.setText(\"Terms And Conditions\");\n\n2. Using LabelFor property:\nUse ONE of the following techniques \n2.1. Using XML:\n    \u003cTextView\n        ...\n        android:labelFor=\"@+id/rcheckboxbtnExample\" /\u003e\n\u003cCheckBox\n        android:id=\"@+id/rcheckboxbtnExample\" /\u003e\n\n2.2. Using Java:\ntextLabel.setLabelFor(rcheckboxbtnExample.getId());\n\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/checkboxes\n\nGoogle:\n\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#label-elements\n\nhttps://developer.android.com/reference/android/widget/CheckBox"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Radio button is not programmatically associated with its visible label.",
        "recommendation":  "Fix this issue by implementing Android native component RadioButton with android:text, to associate visible label for the Radio Button.\n \n1.Using Text property\nUse ONE of the following techniques \n1.1. Using XML:\n\u003cRadioButton\nandroid:id=\"@+id/radiobtnExample\"\nandroid:checked=\"true\"\nandroid:text=\"Credit Card\"/\u003e\n1.2. Using JAVA:\nradioBtn.setText(\"Credit Card\");\n\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/labels\n\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/radio-buttons\n\nGoogle:\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#label-elements\n\nhttps://developer.android.com/reference/android/widget/RadioButton"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control is missing a necessary state.",
        "recommendation":  "Using JAVA:\nFix this issue by ONE of the following techniques:\n1. Update the setStateDescription property to convey the control\u0027s necessary state: \n   mycontrol.setStateDescription(\"Selected\");\n2. Append the state information to the contentDescription of the control:\n   mycontrol.setContentDescription(mycontrol.getText() + \", Selected\");\n\nNote: If you are using API 30+ (Android 11.0 and up), then the state information must be conveyed using android:stateDescription.\n\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/custom-controls/accordion\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityNodeInfo#setStateDescription(java.lang.CharSequence)"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control has an incorrect state.",
        "recommendation":  "Using JAVA:\nFix this issue by ONE of the following techniques:\n1. Update the setStateDescription property to convey the control\u0027s necessary state: \n   mycontrol.setStateDescription(\"[STATE]\");\n2. Append the state information to the contentDescription of the control:\nmycontrol.setContentDescription(mycontrol.getText() + \", [STATE]\");\n3. Remove setStateDescription property or remove the state information from contentDescription \n\nNote: If you are using API 30+ (Android 11.0 and up), then the state information must be conveyed using android:stateDescription.\n\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/custom-controls/accordion\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityNodeInfo#setStateDescription(java.lang.CharSequence)"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The control has an incorrect role.",
        "recommendation":  "Fix this issue by using ONE of the following techniques \n1.\tUse default native controls role\n2.\tUse the AccessibilityNodeInfoCompat property to convey the custom role.\n2.1 Using JAVA: AccessibilityNodeInfoCompat\nViewCompat.setAccessibilityDelegate(checkBoxObj, new AccessibilityDelegateCompat() {\n@Override\npublic void onInitializeAccessibilityNodeInfo(@NonNull View host, @NonNull AccessibilityNodeInfoCompat info) {\nsuper.onInitializeAccessibilityNodeInfo(host, info);\ninfo.setRoleDescription(\"[ROLE]\");\n}\n});\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.AccessibilityDelegate"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The disabled state of a control is not conveyed to screen reader users.",
        "recommendation":  "JAVA:\nFix this issue by updating the setEnabled property as false to convey that the control is disabled.\n\nUse ONE of the following techniques \n\n1. Using XML:\n\u003cCheckBox\n        android:id=\"@+id/checkboxExample\"\n        android:enabled=\"false\"\n        android:text=\"Terms and Conditions\"  /\u003e\n\n2. Using JAVA:\nCheckBox checkBoxObj = findViewById(R.id.checkboxExample);\ncheckBoxObj.setEnabled(false);\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View#setEnabled(boolean)"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The button does not have a role.",
        "recommendation":  "Fix this issue by updating the clickable property as true for interactive elements which helps TalkBack to announce as \"Double-tap to active.\"\n\nUse ONE of the following techniques \n\n1. Using XML: \nandroid:clickable=\"true\"\n\n2. Using Java:\nbinding.mycontrol.setClickable(true);\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/buttons\n\nGoogle:\nhttps://developer.android.com/reference/android/view/View#attr_android:clickable"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The button is missing an accessible name/label. As a result, its functionality or purpose is not conveyed to screen reader users.",
        "recommendation":  "Fix this issue by updating the text property or contentDescription property for the button, to convey the purpose or function of the button. \n\nUse ONE of the following techniques \n\n1. Using XML\nandroid:text=\"Send me Email on existing offer\"\nOR\nandroid:contentDescription=\"Send me Email on existing offer.\"\n\n2. Using Java:\nbuttonSendEmail.setText(\"Send me Email on existing offer.\");\nOR\nbuttonSendEmail.setContentDescription(\"Send me Email on existing offer.\");\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/buttons\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The button is missing both a role and an accessible name/label.",
        "recommendation":  "Fix this issue by updating the text property or the contentDescription property for the button, to convey the purpose or function of the button. Update the clickable property as true for interactive elements which helps TalkBack to announce as \"Double-tap to active.\" \n\nUse ONE of the following techniques \n\n1. Using XML\nandroid:clickable=\"true\"\nandroid:text=\"Send me Email on existing offer\"\nOR\nandroid:clickable=\"true\"\nandroid:contentDescription=\"Send me Email on existing offer.\"\n\n2. Using Java:\nbtnTextView.setText(\"Send me Email on existing offer.\");\nOR\nbtnTextView.setContentDescription(\"Send me Email on existing offer.\");\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/buttons\nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription\n\nhttps://developer.android.com/reference/android/view/View#attr_android:clickable"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The selected state of a button is not conveyed to screen reader users.",
        "recommendation":  "Using JAVA:\nFix this issue by ONE of the following techniques:\n1. Update the setStateDescription property to convey the control\u0027s necessary state: \nmycontrol.setStateDescription(\"[STATE]\");\n2. Append the state information to the contentDescription of the control:\nmycontrol.setContentDescription(mycontrol.getText() + \", [STATE]\");\n\nNote: If you are using API 30+ (Android 11.0 and up), then the state information must be conveyed using android:stateDescription.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/buttons\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityNodeInfo#setStateDescription(java.lang.CharSequence)\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The pressed state of a button is not conveyed to screen reader users.",
        "recommendation":  "Using JAVA:\nFix this issue by ONE of the following techniques:\n1. Update the setStateDescription property to convey the control\u0027s necessary state: \nmycontrol.setStateDescription(\"[STATE]\");\n2. Append the state information to the contentDescription of the control:\nmycontrol.setContentDescription(mycontrol.getText() + \", [STATE]\");\n\nNote: If you are using API 30+ (Android 11.0 and up), then the state information must be conveyed using android:stateDescription.\n\nREFERENCE:\nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/buttons\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityNodeInfo#setStateDescription(java.lang.CharSequence)\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The expand/collapse state of a toggle-type element is missing or is used incorrectly.",
        "recommendation":  "Using JAVA:\nFix this issue by ONE of the following techniques:\n1. Update the setStateDescription property to convey the control\u0027s necessary state: \nmycontrol.setStateDescription(\"[STATE]\");\n2. Append the state information to the contentDescription of the control:\nmycontrol.setContentDescription(mycontrol.getText() + \", [STATE]\");\n\nNote: If you are using API 30+ (Android 11.0 and up), then the state information must be conveyed using android:stateDescription.\n\nREFERENCE:\nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/buttons\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityNodeInfo#setStateDescription(java.lang.CharSequence)\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Informative text (static text) is implemented with an interactive role.",
        "recommendation":  "Fix this issue by ALL of the following techniques (if applied):\n1.        Remove setClickable(true) property \n2.        Remove setOnClickListener \n3.        Remove setRoleDescription property\n4.        Update contentDescription \n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Informative text (static text) is implemented with a state.",
        "recommendation":  "Fix this issue by ALL of the following techniques (if applied):\n1.        Remove setStateDescription property\n2.        Update contentDescription \n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "Informative text (static text) is implemented with a state.",
        "recommendation":  "Fix this issue by ALL of the following techniques (if applied):\n1.        Remove setStateDescription property\n2.        Update contentDescription \n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like an AlertDialog but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the default Alert control(Dialog or Dialogfragment) to represent alerts. \n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/dialogs/alert-dialog\n\nGoogle:\nhttps://developer.android.com/reference/android/app/AlertDialog"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a BadgeDrawable but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the default BadgeDrawable control. Use the contentDescription property to convey the Badge information.\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/com/google/android/material/badge/BadgeDrawable"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a BottomNavigationView but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the default Bottom Navigation View.\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/com/google/android/material/bottomnavigation/BottomNavigationView"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a CheckBox but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the default checkbox control.\n\nUse ONE of the following techniques \n1. Implement using android:text or contentDescription. Note: contentDescription would override android:text \n1.1. Using XML:\n\u003cCheckBox\n        android:id=\"@+id/checkBox\" \n        android:text=\"Pizza\" /\u003e\n1.2. Using Java:\ncheckBox.setText(\"Pizza\");\n\n2. Implement using labelFor property:\n2.1. Using XML:\n  \u003cCheckBox\n            android:id=\"@+id/tsCheckbox\"/\u003e\n        \u003cTextView\n            android:id=\"@+id/idInsidetc\" \n            android:labelFor=\"@id/tsCheckbox\"\n            android:text=\"I Accept Terms and conditions\"/\u003e\n2.2. Using Java:\ntextViewObject.setLabelFor(R.id.tsCheckbox);\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/checkboxes\n\nGoogle:\nhttps://developer.android.com/develop/ui/views/components/checkbox"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a EditText but doesn\u0027t behave like one.",
        "recommendation":  "Fix the issue by implementing ONE of the following techniques \n\n1. Ensure that the form field is programmatically associated with the label e.g. via the labelFor property.\n1.1 Using XML:\n\u003cTextView\n...\nandroid:labelFor=\"@id/edittext_second\"/\u003e\n\u003cEditText\nandroid:id=\"@+id/edittext_second\"\n....\n\u003cEditText\u003e\n1.2 Using Java:\nmyLabel.setLabelFor(myInput.getId());\n\n2. Ensure that the form field is implemented using TextInputLayout and programmatically associated with the visible label e.g. via the Hint property.\n2.1 Using XML:\n    \u003ccom.google.android.material.textfield.TextInputLayout\n        android:id=\"@+id/textInputLayout\"\n        …\u003e\n        \u003ccom.google.android.material.textfield.TextInputEditText\n            android:id=\"@+id/editTextLayout\"\n            android:hint=\"First Name\" \n        …/\u003e\n    \u003c/com.google.android.material.textfield.TextInputLayout\u003e\n2.2 Using Java:\neditTextLayout.setHint(\"First Name\");\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/labels\nGoogle:\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#editable\n\nhttps://developer.android.com/reference/com/google/android/material/textfield/TextInputLayout\n\nhttps://developer.android.com/reference/com/google/android/material/textfield/TextInputEditText"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a ExpandableListView but doesn\u0027t behave like one.",
        "recommendation":  "Fix the issue by implementing the default ExpandableListView component with BaseExpandableListAdapter.\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/widget/ExpandableListView"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control opens Chrome but is missing the link role.",
        "recommendation":  "Fix the issue by implementing the default TextView as link.\nREFERENCE:\nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/links"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a Menu but doesn\u0027t behave like one.",
        "recommendation":  "Fix the issue by implementing the standard Options menu or Context menu.\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/navigation/menus\n\nGoogle:\nhttps://developer.android.com/develop/ui/views/components/menus"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a PopupMenu but doesn\u0027t behave like one.",
        "recommendation":  "Fix the issue by implementing the default PopupMenu component.\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/navigation/menus\n\nGoogle:\nhttps://developer.android.com/reference/android/widget/PopupMenu"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a ProgressBar but doesn\u0027t behave like one.",
        "recommendation":  "Fix the issue by implementing the default ProgressBar component. using the contentDescription property update the label name for the element.\n\nUse ONE of the following techniques \n1. Using XML:\n \u003cProgressBar\n        android:id=\"@+id/progressObject\" \n        android:contentDescription=\"Loading\"\n         .....\n        /\u003e\n\n2. Using Java:\nprogressObject.setContentDescription(\"Loading\");\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/navigation/progress-bars\n\nGoogle:\nhttps://developer.android.com/reference/android/widget/ProgressBar\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a RadioButton but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the default RadioGroup with RadioButton component. \n\nUse ALL of the following techniques. \n1. XML File:\n\u003cRadioGroup \nandroid:id=\"@+id/radioGroup\"\n…\n\u003e\n\u003cRadioButton \nandroid:id=\"@+id/radiobutton\"\nandroid:text=\"Credit Card\"/\u003e \n\u003c/RadioGroup\u003e\n2. JAVA File:\nint childCount = radioGroup.getChildCount();\nfor (int i = 0; i \u003c childCount; i++) {\n    ...\n                info.setLabeledBy(groupLabel);\n}\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/forms/radio-buttons\n\nGoogle:\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#editable\n\nhttps://developer.android.com/develop/ui/views/components/radiobutton"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a RatingBar but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the default RatingBar component, using the contentDescription property we need to update the label text for the element.\n\nUse ONE of the following techniques \n\n1. Using XML:\n \u003cRatingBar\n        android:id=\"@+id/ratingbarObj\" \n        android:contentDescription=\"Rate the App\"\n        /\u003e\n\n2. Using Java:\nratingbarObj.setContentDescription(\"Rate the App\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription\n\nhttps://developer.android.com/reference/android/widget/RatingBar"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a SeekBar but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the default SeekBar component with the contentDescription property.\n\nUse ONE of the following techniques \n\n1. Using XML:\n\u003cSeekBar\nandroid:id=\"@+id/seekBarObject\" \nandroid:contentDescription=\"Set the price greater than\"\n/\u003e\n2. Using Java:\nseekBarObject.setContentDescription(\"Set the price greater than\");\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/widget/SeekBar\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a SnackBar but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the default SnackBar component\n\nUsing Java:\n Snackbar.make(view, \"TextView is clicked\", Snackbar.LENGTH_LONG)\n                        .setAction(\"Action\", null).show();\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/com/google/android/material/snackbar/Snackbar"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a Spinner but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the standard Spinner component\n\nUse ONE of the following techniques \n\n1. Using XML:\n\u003cSpinner\n        android:id=\"@+id/sampleSpinner\" \n        android:contentDescription=\"Select Country\"\n        /\u003e\n\n2. Using Prog: Java\n  spinnerObject.setContentDescription(\"Select country\" );\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/develop/ui/views/components/spinner"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a Switch but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the standard Switch component. \n\nUse ONE of the following techniques. \n1.        Implement Switch component using android:text or contentDescription. Note: contentDescription would override android:text\n1.1. Using XML:\n\u003cSwitch\nandroid:text=\"Notification\"/\u003e\n1.2. Using Java:\nsimpleSwitch.setText(\"Notification\");\n\n2.        Implement Switch component using labelFor\n\n2.1. Using XML:\n\u003cSwitch\n…/\u003e\n\u003cTextView\nandroid:labelFor=\"@id/simpleSwitch\"\nandroid:text=\"Notification\"\n/\u003e\n2.2. Using Java:\nidInsidetc.setLabelFor(R.id.simpleSwitch);\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/switch\n\nGoogle:\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#editable\n\nhttps://developer.android.com/reference/android/widget/Switch\n\nhttps://developer.android.com/reference/android/view/View.html#attr_android:contentDescription"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a TabHost but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by using the standard TabHost component.\n\nREFERENCE: \nGoogle:\nhttps://developer.android.com/reference/android/widget/TabHost"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a Toast but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by using the standard Toast component implementation.\n\nUsing Java:\nToast.makeText(getContext(), \"Feedback Submitted\", Toast.LENGTH_SHORT).show();\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/announcements/toasts\n\nGoogle:\nhttps://developer.android.com/guide/topics/ui/notifiers/toasts"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "A control looks like a ToggleButton but doesn\u0027t behave like one.",
        "recommendation":  "Fix this issue by implementing the default ToggleButton component.\n\nUse ONE of the following techniques \n1. Implement ToggleButton using android:text or contentDescription. Note: contentDescription would override android:text\n1.1 Using XML:\n\u003cToggleButton\n        …\n        android:text=\"Email notifications\"\n/\u003e\n1.2 Using Java:\ntoggleButton.setText(\"Enable Email Notifications\"); \n\n2. Implement ToggleButton component using labelFor\n2.1 Using XML:\n\u003cTextView\n...\nandroid:text=\"Enable Email Notifications\"\nandroid:labelFor=\"@id/toggleBtnObj\" /\u003e\n\u003cToggleButton\n...\nandroid:textOff=\"Off\"\nandroid:textOn=\"On\"/\u003e\n\n2.2 Using Java:\nidtermsandConditions.setLabelFor(R.id.toggleBtnObj);\n\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/controls/toggle-buttons\n\nGoogle:\nhttps://developer.android.com/guide/topics/ui/accessibility/principles#editable\n\nhttps://developer.android.com/develop/ui/views/components/togglebutton"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.2.a",
        "issueDescription":  "The custom select element is missing required roles and/or states or properties.",
        "recommendation":  "Using JAVA:\nFix this issue by ONE of the following techniques:\n1. Update the setStateDescription property to convey the control\u0027s necessary state: \n   mycontrol.setStateDescription(\"Selected\");\n2. Append the state information to the contentDescription of the control:\n   mycontrol.setContentDescription(mycontrol.getText() + \", Selected\");\n\nNote: If you are using API 30+ (Android 11.0 and up), then the state information must be conveyed using android:stateDescription.\n\nREFERENCE: \nDeque University: \nhttps://dequeuniversity.com/class/mobile-android-techniques/custom-controls/accordion\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityNodeInfo#setStateDescription(java.lang.CharSequence)"
    },
    {
        "platform":  "Android",
        "checkpoint":  "4.1.3.a",
        "issueDescription":  "Status message is not automatically announced by the screen reader.",
        "recommendation":  "Fix this issue by using ONE of the following techniques:\n1.        Implement status message using the Android Snackbar component.\n2.        Implement status message using the Android Toast component.\n3.        Implement status message using the Android accessibilityLiveRegion property.\n4.        Implement status message using the Android announceForAccessibility property.\nREFERENCE: \nDeque University:\nhttps://dequeuniversity.com/class/mobile-android-techniques/announcements/pop-up-messages\n\nhttps://dequeuniversity.com/class/mobile-android-techniques/announcements/toasts\n\nhttps://dequeuniversity.com/class/mobile-android-techniques/announcements/live-regions\n\nhttps://dequeuniversity.com/class/mobile-android-techniques/announcements/accessibility-announcements\n\nGoogle:\nhttps://developer.android.com/reference/android/view/accessibility/AccessibilityEvent#TYPE_ANNOUNCEMENT"
    }
];

if (typeof module !== 'undefined' && module.exports) { module.exports = NATIVE_RECOMMENDATIONS; }
if (typeof window !== 'undefined') { window.NATIVE_RECOMMENDATIONS = NATIVE_RECOMMENDATIONS; }