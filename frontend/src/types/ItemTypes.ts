export enum ItemTypes {
  CHECKPOINT = "checkpoint",
  SUBCHECKPOINT = "subcheckpoint",
  INTRODUCTION = "introduction",
  ADD = "add",
  CARD = "card",
  ANSWER = "answer", // The point where the answer is not in the answered slot
  ANSWERED = "answered", // The point where the answer is already in the answered slot
}
