import React from "react";

const Register = (props) => (
    <main class="pa4 black-80 shadow-5 center w-100 w-50-m w-250-l mw6 br3">
  <form class="measure center">
    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
      <legend class="f1 fw6 ph0 mh0">Register</legend>
      <div class="mt3">
        <label class="db fw6 lh-copy f6" for="name">Name</label>
        <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
      </div>
      <div class="mt3">
        <label class="db fw6 lh-copy f6" for="email-address">Email</label>
        <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
      <div class="mv3">
        <label class="db fw6 lh-copy f6" for="password">Password</label>
        <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
    </fieldset>
    <div class="">
      <input 
      onClick={() => props.onRouteChange("home")}
      class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
      type="submit"
      value="Register" />
    </div>
  </form>
</main>
);

export default Register;