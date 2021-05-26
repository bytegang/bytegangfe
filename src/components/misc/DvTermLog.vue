<template>

  <el-dialog v-if="obj"
             :title="title"
             :visible="visible"
             @close="doClose"
             @opened="doOpened"
  >

    <div ref="terminal"></div>


  </el-dialog>

</template>

<script>
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';

import "xterm/css/xterm.css"

function b64DecodeUnicode(str) {
  // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export default {
  props: {obj: {type: Object, require: true}, visible: Boolean, title: String},
  name: 'DvTermLog',
  data() {
    return {
      term: null,
    };
  },
  computed: {},
  methods: {
    doClose() {
      if (this.term) {
        this.term.dispose()
      }
      this.term = null
      this.$emit('afterClose')
    },
    doOpened() {
      const fitAddon = new FitAddon();
      let term = new Terminal({
        disableStdin: true,
        fontSize: 14,
        cursorBlink: false,
        cursorStyle: 'bar',
        bellStyle: "sound",
        fontFamily: 'Consolas,Menlo,Courier,monospace',
      });
      term.loadAddon(fitAddon);
      term.open(this.$refs.terminal);
      fitAddon.fit(); // first resizing
      term.clear();
      let msg = b64DecodeUnicode(this.obj.bytes_tty);
      term.write(msg)
      this.term = term
    },
    doLink(ev, url) {
      if (ev.type === 'click') {
        window.open(url)
      }
    },
  },
};
</script>
<style scoped>
</style>
