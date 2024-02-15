import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'

export class MotionWrapper {

  static name = 'motion'

  constructor(buffer) {
    this.buffer = buffer
    this.wrapper = () => {
      const motionParser = new Parser().endianess('little')
        .floatle('motionWorldPositionX')
        .floatle('motionWorldPositionY')
        .floatle('motionWorldPositionZ')
        .floatle('motionWorldVelocityX')
        .floatle('motionWorldVelocityY')
        .floatle('motionWorldVelocityZ')
        .int16le('motionWorldForwardDirX')
        .int16le('motionWorldForwardDirY')
        .int16le('motionWorldForwardDirZ')
        .int16le('motionWorldRightDirX')
        .int16le('motionWorldRightDirY')
        .int16le('motionWorldRightDirZ')
        .floatle('motionGForceLateral')
        .floatle('motionGForceLongitudinal')
        .floatle('motionGForceVertical')
        .floatle('motionYaw')
        .floatle('motionPitch')
        .floatle('motionRoll');

      return new Parser().endianess('little')
        .nest('raceHeader', { type: PacketHeaderWrapper })
        .array('motionCarMotionData', {
          type: motionParser,
          length: 22
        });
    }
  }

  wrap() {
    return this.wrapper().parse(this.buffer)
  }
}