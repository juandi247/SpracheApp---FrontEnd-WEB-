import { useState } from "react";
import { WritingLevels } from "./WritingLevels"; 
import { WritingTopicSelector } from "./TopicSelector";
import { WritingEditor } from "./WritingEditor";
import { WritingFeedback } from "./WritingFeedback";

export function WritingPractice() {
  const [state, setState] = useState({});

  if (state.submission) {
    return (
      <WritingFeedback
        submission={state.submission}
        onTryAgain={() => setState({})}
        level={state.level}
        topic={state.topic}
      />
    );
  }

  if (state.level && state.topic && state.instructions) {
    return (
      <WritingEditor
        level={state.level}
        topic={state.topic}
        instructions={state.instructions}
        onBack={() => setState({ level: state.level })}
        onSubmit={(submission) => setState({ ...state, submission })}
      />
    );
  }

  if (state.level) {
    return (
      <WritingTopicSelector
        level={state.level}
        onBack={() => setState({})}
        onTopicSelect={(topic, instructions) => 
          setState({ ...state, topic, instructions })}
      />
    );
  }

  return (
    <WritingLevels
      onLevelSelect={(level) => setState({ level })}
    />
  );
}
