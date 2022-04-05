<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    #[Route('/{react}', name: "react_main", requirements: ["react" => "((?!api|register|login).)*$"])]
    public function index(): Response
    {
        return $this->render('react/index.html.twig', [
        ]);
    }
}
