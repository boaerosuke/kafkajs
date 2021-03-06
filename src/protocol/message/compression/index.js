const { KafkaJSNotImplemented } = require('../../../errors')

const MESSAGE_CODEC_MASK = 0x3
const RECORD_BATCH_CODEC_MASK = 0x07

const Types = {
  None: 0,
  GZIP: 1,
  Snappy: 2,
  LZ4: 3,
  ZSTD: 4,
}

const Codecs = {
  [Types.GZIP]: () => require('./gzip'),
  [Types.Snappy]: () => {
    throw new KafkaJSNotImplemented('Snappy compression not implemented')
  },
  [Types.LZ4]: () => {
    throw new KafkaJSNotImplemented('LZ4 compression not implemented')
  },
  [Types.ZSTD]: () => {
    throw new KafkaJSNotImplemented('ZSTD compression not implemented')
  },
}

const lookupCodec = type => (Codecs[type] ? Codecs[type]() : null)
const lookupCodecByAttributes = attributes => {
  const codec = Codecs[attributes & MESSAGE_CODEC_MASK]
  return codec ? codec() : null
}
const lookupCodecByRecordBatchAttributes = attributes => {
  const codec = Codecs[attributes & RECORD_BATCH_CODEC_MASK]
  return codec ? codec() : null
}

module.exports = {
  Types,
  Codecs,
  lookupCodec,
  lookupCodecByAttributes,
  lookupCodecByRecordBatchAttributes,
}
