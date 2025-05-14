export default class MessageData {
  constructor(dataState, header, messageList, stepMethods) {
    this.dataState = dataState;
    this.header = header;
    this.messageList = messageList;
    this.stepMethods = stepMethods;
  }

  prevStep = () => {
    this.stepMethods.prevStep();
  };

  nextStep = () => {
    this.stepMethods.nextStep();
  };

  confirmStep = () => {
    this.stepMethods.confirmStep();
  };

  yesStep = () => {
    this.stepMethods.yesStep();
  };

  noStep = () => {
    this.stepMethods.noStep();
  };

  promptStep = () => {
    this.stepMethods.promptStep();
  };
}
