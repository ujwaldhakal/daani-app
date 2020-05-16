<script>
  export let label;
</script>
<style lang="scss">
  $color-background: #eaecfa;
  $color-loader: #159932;
  body {
    background: $color-background;
  }

  .text-loader {
    width: auto;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-family: helvetica, arial, sans-serif;
    text-transform: uppercase;
    font-weight: 900;
    color: $color-loader;
    letter-spacing: 0.2em;

    &::before, &::after {
      content: "";
      display: block;
      width: 15px;
      height: 15px;
      background: $color-loader;
      position: absolute;
      animation: load .7s infinite alternate ease-in-out;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }
  }

  @keyframes load {
    0% { left: 0; height: 30px; width: 15px }
    50% { height: 8px; width: 40px }
    100% { left: 235px; height: 30px; width: 15px}
  }

</style>

<div class="text-loader">{label ? label : 'Loading...'}</div>
