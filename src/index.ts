importAll(require.context('./slider', true, /((?<!\.test)(\.scss|\.ts))$/));
importAll(require.context('./demo', true, /((?<!\.test)(\.scss|\.ts))$/));
importAll(require.context('./', false, /((?<!\.test)(\.scss|\.ts))$/));
function importAll(context: __WebpackModuleApi.RequireContext) {
  context.keys().forEach(context);
}
