const domain = {
  /**
   * Start of interval in seconds
   */
  startSeconds: 0,

  /**
   * End of interval in seconds
   */
  endSeconds: 86_400,

  /**
   * The step value for the slider in seconds.
   */
  step: 1800,

  toArray: function (): [number, number] {
    return [
      this.startSeconds,
      this.endSeconds
    ];
  },

  getTicks: function (): number[] {
    const result: number[] = [];
    for (let i = this.startSeconds; i <= this.endSeconds; i += this.step) {
      result.push(i);
    }

    return result;
  }
};


export default domain;