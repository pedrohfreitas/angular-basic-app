import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
export class CacheRouteReuseStrategy implements RouteReuseStrategy {
    
    //atributo que irá armazenar os componenetes que devem ser cacheados
    storedRouteHandles = new Map<string, DetachedRouteHandle>();

    //Este método é chamado toda vez que ocorre a navegação entre as rotas.
    //o before é a rota antiga e a curr a atual.
    //Se retornar TRUE, o roteamento não ocorrerá (o que significa que o roteamento não mudou). Se for FALSE, o roteamento ocorrerá e o restante dos métodos vão ser chamados.
    shouldReuseRoute(before: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return before.routeConfig === curr.routeConfig;
    }

    // Esse método é chamado para a rota que acabou de acessar(atual). 
    // Depois que o componente é carregado, esse método é chamado. 
    // Se esse método retornar TRUE, o método retrieve será chamado, caso contrário, o componente será criado do zero
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getPath(route);
        if (path !== '') {
            return this.storedRouteHandles.has(this.getPath(route));
        }

        return false;
    }

    //Este método é chamado se shouldAttach retorna TRUE, fornece como parâmetro a rota atual (que acabamos de acessar) 
    // e retorna um RouteHandle armazenado . Se retorna nulo não tem efeitos. Podemos usar este método para obter qualquer
    // RouteHandle armazenado manualmente. Isso não é gerenciado pelo framework automaticamente. 
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
    }


    //Este método é invocado quando deixamos a rota atual. Se ele retornar true, o método store é chamado.
    //Ou seja, se este método retornar true, o sistema armazena o componenete anterior do
    // Map de componenetes para ser recuperado posteriormente
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getPath(route);
        if (path !== '') {
            return true;
        }
        return false;
    }

    //Esse método é chamado somente se o shouldDetach retornar true.
    //Método que armazena os dados do DetachedRouteHandle para serem recuperados posteriormente
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        this.storedRouteHandles.set(this.getPath(route), detachedTree);
    }

    // Método que pega o Path da Rota para servir de key para o Map de RouteHandle
    private getPath(route: ActivatedRouteSnapshot): string {
        if (route.routeConfig !== null && route.routeConfig.data != null && route.routeConfig.data.cache == true) {
            return route.pathFromRoot.map(v => v.url.map(segment => segment.toString()).join('/')).join('/');
        }
        return '';
    }
}